/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_KEY: process.env.NEXT_PUBLIC_SITE_KEY,
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY
  }
}

module.exports = nextConfig
