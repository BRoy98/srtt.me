module.exports = {

    /* local port for node sever */
    PORT: process.env.PORT || 8000,

    /* database connection */
    MONGO_URL: process.env.MONGO_URL || 'mongodb_url',

    /* Google Login Client ID */
    GOOGLE_LOGIN_CLIENT_ID: '',

    /* Secret passphrase for generating JWT keys */
    JWT_SECRET: '',
};