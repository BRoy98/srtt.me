'use strict';
const urlRegex = require('url-regex');
let Url = require('../models/url');
const {
    generateUrl
} = require('../utils');
const config = require('../config');

const addUrl = async (req, res) => {
    const destUrl = req.body.url;
    const shorturl = req.body.shorturl;

    // Validate URL existence
    if (!destUrl)
        return res.status(400).json({
            result: 'fail',
            error: 'No URL has been provided.'
        });

    // Validate URL
    const isValidUrl = urlRegex({
        exact: true,
        strict: false
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

    // Validate short URL length
    if (shorturl && shorturl.length > 20)
        return res.status(400).json({
            result: 'fail',
            error: 'short URL length must not exceed 20 characters'
        });

    // Check if short URL already exists
    if (shorturl && shorturl.length) {
        let urlExists = await Url.findOne({
            shortId: shorturl
        });

        if (urlExists) {
            return res.status(400).json({
                result: 'fail',
                error: 'short URL is not available'
            });
        }
    }

    // Create database entry
    const newUrl = new Url({
        destUrl: destUrl
    });
    newUrl.user = req.jwtData.email;
    if (shorturl && shorturl.length)
        newUrl.shortId = shorturl;
    else
        newUrl.shortId = generateUrl()

    // save the entry to database
    newUrl.save((err, save) => {
        if (err)
            return res.status(403).json({
                result: 'fail',
                error: 'Server unreachable. Please try after some time.',
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
}

module.exports = {
    addUrl: addUrl
}