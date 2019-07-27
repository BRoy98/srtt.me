const nodemailer = require('nodemailer');
const config = require('../config');

const mailConfig = {
    host: config.MAIL_SERVER_HOST,
    port: config.MAIL_SERVER_PORT,
    secure: config.MAIL_SERVER_SECURE,
    auth: {
        user: config.MAIL_SERVER_AUTH_USER,
        pass: config.MAIL_SERVER_AUTH_PASSWORD,
    },
};

module.exports = nodemailer.createTransport(mailConfig);