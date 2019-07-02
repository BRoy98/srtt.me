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
} = require('./util');

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

// serve frontend
app.use(express.static(path.join(__dirname + '/../client/dist/srtt')));

// frontend routes
app.get(preservedUrls, (req, res) => {
    res.sendFile(path.resolve('client/dist/srtt/index.html'));
});

app.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Server running on http://localhost:${config.PORT}`);
});