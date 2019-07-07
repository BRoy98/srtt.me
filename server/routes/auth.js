'use strict';
const express = require('express');
const router = express.Router();
const {
    OAuth2Client
} = require('google-auth-library');
const config = require('../config');
const authController = require('../controllers/authController');

const client = new OAuth2Client(config.GOOGLE_LOGIN_CLIENT_ID);

router.post('/google/signin', (req, res, next) => {

    const token = req.body.id_token;

    // verify user token
    client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_LOGIN_CLIENT_ID,
    }).catch((error) => {
        res.send(error);
        return res.status(400).json({
            result: 'fail',
            error: 'Failed to sign in with Google'
        });
    }).then((user) => {
        req.userdata = user.payload;
        req.provider = 'google';
        next();
    });
}, authController.signin);



module.exports = router;