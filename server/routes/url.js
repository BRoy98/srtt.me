const express = require('express');
const urlRegex = require('url-regex');
const router = express.Router();
const {
    generateUrl
} = require('../utils');
const config = require('../config');

let Url = require('../models/url');

router.post('/new', (req, res) => {

    const destUrl = req.body.url;

    // Validate URL existence
    if (!destUrl)
        return res.status(400).json({
            result: 'fail',
            error: 'No URL has been provided.'
        });

    // Validate URL
    const isValidUrl = urlRegex({
        exact: true,
    }).test(destUrl);
    if (!isValidUrl) return res.status(400).json({
        result: 'fail',
        error: 'URL is not valid.'
    });

    // Validate URL length
    if (destUrl.length > 2000) {
        return res.status(400).json({
            result: 'fail',
            error: 'Maximum URL length is 2000.'
        });
    }

    // Create database entry
    const newUrl = new Url({
        destUrl: destUrl,
        shortId: generateUrl()
    });

    newUrl.save((err, save) => {
        if (err)
            return res.status(403).json({
                result: 'fail',
                error: 'Server unreachable. Please try after some time.'
            });
        if (save)
            return res.status(200).json({
                result: 'success',
                createdAt: save.createdAt,
                shortId: save.shortId,
                shortUrl: 'https://' + config.DEFAULT_DOMAIN + '/' + save.shortId,
                destUrl: destUrl
            });
    });
});

router.get('**', (req, res, next) => {
    next();
});

router.post('**', (req, res, next) => {
    next();
});

module.exports = router;