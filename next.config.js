import withPWA from 'next-pwa';

const prod = process.env.NODE_ENV === 'production'
module.exports =  withPWA({
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: prod ? false : true
  },
});
