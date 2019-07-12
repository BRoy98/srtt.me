const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const cors = require('cors');
const {
    preservedUrls
} = require('./utils');

let Url = require('./models/url');

// Establish Connection
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true
});
let db = mongoose.connection;

// Check connection
db.once('open', function () {
    console.log('> Connected to MongoDB');
});

// Security headers
app.use(cors());
app.set('trust proxy', true);
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    req.realIp = req.headers['x-real-ip'] || req.connection.remoteAddress || '';
    return next();
});

// serve frontend files
app.use(express.static(path.join(__dirname + '/../client/dist/srtt')));

// frontend routes
app.get(preservedUrls, (req, res) => {
    return res.sendFile(path.resolve(__dirname + '/../client/dist/srtt/index.html'));
});

app.use('/api', require('./routes'));

app.get('/:id', (req, res) => {
    const url = req.params.id;
    Url.findOne({
            'shortId': url
        }).exec()
        .then(urlData => {
            if (!urlData)
                return res.redirect('/404');
            var url = urlData.destUrl;
            if (!/^https?:\/\//i.test(url) && !/^http?:\/\//i.test(url)) {
                url = 'http://' + url;
            }
            return res.status(301).redirect(urlData.destUrl);
        });
});

app.get('**', (req, res) => {
    return res.redirect('/404');
});

app.post('**', (req, res) => {
    return res.status(404).json({
        status: 'fail',
        error: 'Route not found'
    });
});

app.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Server running on http://localhost:${config.PORT}`);
});