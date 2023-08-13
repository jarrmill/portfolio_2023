/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'jarrodcodes.ghost.io',
            port: '',
            pathname: '/content/images/**',
          },
        ],
      },
}

module.exports = nextConfig
