/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'imagedelivery.net',
            port: '',
            pathname: '/**',
          },
        ],
        loader: 'custom',
        loaderFile: './imageLoader.js'
      },
}

module.exports = nextConfig
