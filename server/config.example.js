module.exports = {

  /* local port for node sever */
  PORT: process.env.PORT || 8000,

  /* The domain that this website is on */
  DEFAULT_DOMAIN: 'srtt.me',

  /* database connection */
  MONGO_URL: process.env.MONGO_URL || 'mongodb_url',

  /* Google Login Client ID */
  GOOGLE_LOGIN_CLIENT_ID: '',

  /* 
    Facebook app access token 
    Get your app access token from https://developers.facebook.com/tools/accesstoken
  */
  FACEBOOK_APP_ACCESS_TOKEN: '',

  /* Secret passphrase for generating JWT keys */
  JWT_SECRET: '',

  /* reCaptcha v2 secret key */
  RECAPTCHA_SECRET_KEY: '',

  /* SMTP Mail server host */
  MAIL_SERVER_HOST: '',

  /* SMTP Mail server port */
  MAIL_SERVER_PORT: '',

  /* SMTP Mail secure server: true/false */
  MAIL_SERVER_SECURE: '',

  /* SMTP Mail server user id */
  MAIL_SERVER_AUTH_USER: '',

  /* SMTP Mail server user password */
  MAIL_SERVER_AUTH_PASSWORD: '',

  /* Mail sending id 
  Format: "srtt.me <noreply@srtt.me>" */
  MAIL_FROM: '',

  /* Receiving mail for contact form
  Format: support@srtt.me" */
  MAIL_CONTACT_TO: '',
};