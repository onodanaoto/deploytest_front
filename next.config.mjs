/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['nextjs.org']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tech0-gen-8-step3-testapp-py2-25.azurewebsites.net/api/:path*'
      }
    ]
  }
};

export default nextConfig;
