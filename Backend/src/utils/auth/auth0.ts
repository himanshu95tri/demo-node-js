const { auth } = require('express-oauth2-jwt-bearer');
const env = process.env.NODE_ENV || "local";
const config = require("../../config/default.json")[env];
const { baseUrl, audience } = config.auth0;
const checkJwt = auth({
    audience: audience,
    issuerBaseURL: baseUrl,
});

export default checkJwt;

