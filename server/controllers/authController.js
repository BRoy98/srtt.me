'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config');
let User = require('../models/user');

/**
 * Sign in a user
 */
const socialSignin = async (req, res) => {

    // Check for the user existance
    let signinUser = await User.findOne({
        "email": req.userdata.email
    });

    // Genetate JWT token for the user
    let token = await getJwt(req.userdata.name, req.userdata.email);

    // If user data is found on the database
    if (signinUser) {
        switch (req.provider) {
            case 'google':
                if (!signinUser.providerStatus.google &&
                    signinUser.providerId.google !== req.userdata.sub) {

                    // Update user data with google account detials
                    let updateUser = await User.findOneAndUpdate({
                        "email": req.userdata.email
                    }, {
                        $set: {
                            "providerId.google": req.userdata.sub,
                            "providerStatus.google": true
                        }
                    });

                    if (!updateUser)
                        return res.status(200).json({
                            status: 'fail',
                            error: 'Failed to sign in with Google'
                        });
                }
                break;
            case 'facebook':
                if (!signinUser.providerStatus.facebook &&
                    signinUser.providerId.facebook !== req.userdata.verify.user_id) {

                    // Update user data with google account detials
                    let updateUser = await User.findOneAndUpdate({
                        "email": req.userdata.email
                    }, {
                        $set: {
                            "providerId.facebook": req.userdata.verify.user_id,
                            "providerStatus.facebook": true
                        }
                    });

                    if (!updateUser)
                        return res.status(200).json({
                            status: 'fail',
                            error: 'Failed to sign in with Google'
                        });
                }
                break;

        }

        return res.status(200).json({
            status: 'success',
            token: token,
            name: req.userdata.name,
            email: req.userdata.email
        });
    } else {

        // Create new user
        let newUser = new User({
            name: req.userdata.name,
            email: req.userdata.email,
        });

        switch (req.provider) {
            case 'google':
                newUser.providerId.google = req.userdata.sub;
                newUser.providerStatus.google = true;
                newUser.isVerified = true;
                break;
        }

        let isUSerCreated = await newUser.save();
        if (!isUSerCreated) {
            throw new error();
        }

        return res.status(200).json({
            status: 'success',
            token: token,
            name: req.userdata.name,
            email: req.userdata.email
        });
    }
};

const verifyUser = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    result: 'fail',
                    error: 'Please login to continue',
                });
            }
            req.jwtData = decoded;
            next();
        });
    } else {
        return res.status(400).json({
            result: 'fail',
            error: 'You are not allowed to access this API',
        });
    }
}


// Genetare JWT token
const getJwt = async (name, email) => {
    return await jwt.sign({
        name: name,
        email: email
    }, config.JWT_SECRET, {
        issuer: 'srtt.me',
        audience: 'web',
        expiresIn: "30d",
    });
}

module.exports = {
    socialSignin: socialSignin,
    verifyUser: verifyUser
}