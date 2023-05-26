/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_KEY: process.env.NEXT_PUBLIC_SITE_KEY,
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    NEXT_PUBLIC_GITHUB_SECRET: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  }
}

module.exports = nextConfig
