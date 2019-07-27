'use strict';
const axios = require('axios');
const express = require('express');
const router = express.Router();
const transporter = require('../utils/mail');
const config = require('../config');


router.post('/contact', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    const captcha = req.body.captcha;
    var remoteIp = (req.headers['x-real-ip'] || req.connection.remoteAddress || '').split(',')[0].trim();

    if (!name || !email || !description) {
        return res.status(400).json({
            result: 'fail',
            message: 'All fields are required.'
        });
    }

    // Set reCaptcha parameters
    var reCaptchaParam = {
        secret: config.RECAPTCHA_SECRET_KEY,
        response: captcha,
        // response: '',
    };
    if (process.env.NODE_ENV == 'production') {
        reCaptchaParam.remoteip = remoteIp;
    }

    // Request to recaptcha api for captcha verification
    axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        params: reCaptchaParam,
    }).then(function (response) {
        // Recaptcha verification failed
        if (!response.data.success) {
            return res.status(401).json({
                result: 'fail',
                message: 'reCAPTCHA is not valid. Try again.'
            });
        }

        transporter.sendMail({
            from: config.MAIL_FROM,
            to: config.MAIL_CONTACT_TO,
            subject: config.DEFAULT_DOMAIN + ': Mail from ' + email,
            text: name + '\n\n' + email + '\n\n' + description,
            html: name + '\n\n' + email + '\n\n' + description,
        }, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    result: 'fail',
                    message: 'Failed to update your request. Please contact us via support@srtt.me'
                });
            }
            console.log('Message sent: %s', info.messageId);
            return res.status(200).json({
                result: 'success',
                message: 'Thank you for contacting us. We will contact you if any further information is needed.'
            });
        });
    });

})

module.exports = router;