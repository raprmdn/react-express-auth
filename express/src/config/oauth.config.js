const { OAuth2Client } = require('google-auth-library');

module.exports = {
    google: new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
    ),
};
