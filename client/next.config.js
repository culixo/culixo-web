const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    REACT_APP_FACEBOOK_REDIRECT_URI:
      process.env.REACT_APP_FACEBOOK_REDIRECT_URI,
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_REDIRECT_URI: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    REACT_APP_BUCKET: process.env.REACT_APP_BUCKET,
  },
  i18n,
};
module.exports = nextConfig;
