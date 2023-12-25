/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
