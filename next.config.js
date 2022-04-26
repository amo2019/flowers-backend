const withPWA = require("next-pwa");

module.exports =  withPWA({
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
