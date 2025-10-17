/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: '/api/upload',
      },
    ];
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig