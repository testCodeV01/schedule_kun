/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
    ...require(`./config/environment/${process.env.APP_ENV || 'local'}.json`),
  }
}

module.exports = nextConfig;
