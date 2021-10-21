const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  env: {
    api_key: "8d4d1ae4d36603cf91dacea6e5205197",
  },
});
