'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const {
    OAuth2Client
} = require('google-auth-library');
const config = require('../config');
const authController = require('../controllers/authController');

const client = new OAuth2Client(config.GOOGLE_LOGIN_CLIENT_ID);

router.post('/google/signin', (req, res, next) => {

    const signinData = req.body.signinData;

    // verify user token
    client.verifyIdToken({
        idToken: signinData.idToken,
        audience: config.GOOGLE_LOGIN_CLIENT_ID,
    }).catch(() => {
        return res.status(400).json({
            result: 'fail',
            error: 'Failed to sign in with Google'
        });
    }).then((user) => {

        // Verify the user id with the google returned id
        if (req.body.signinData.id != user.payload.sub) {
            return res.status(400).json({
                result: 'fail',
                error: 'Failed to sign in with Google'
            });
        }

        // pass login data to auth controller
        req.userdata = user.payload;
        req.provider = 'google';
        next();
    });
}, authController.socialSignin);

router.post('/facebook/signin', (req, res, next) => {

    const signinData = req.body.signinData;

    // Request to facebook api to verify user token
    axios({
        method: 'get',
        url: 'https://graph.facebook.com/debug_token?input_token=' + signinData.authToken +
            '&access_token=' + config.FACEBOOK_APP_ACCESS_TOKEN,
    }).then((user) => {
        user.data = user.data.data;
        console.log('Fb 1', signinData);
        console.log('Fb 2', user.data);

        // Verify the user id with the facebook returned id
        if (req.body.signinData.facebook.id != user.data.user_id) {
            return res.status(400).json({
                result: 'fail',
                error: 'Failed to sign in with Facebook'
            });
        }

        // pass login data to auth controller
        req.userdata = signinData;
        req.userdata.verify = user.data;
        req.provider = 'facebook';
        next();
    }).catch(() => {
        return res.status(400).json({
            result: 'fail',
            error: 'Failed to sign in with Facebook'
        });
    });
}, authController.socialSignin)


module.exports = router;