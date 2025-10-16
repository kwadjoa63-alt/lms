/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io', 'img.clerk.com']
    },
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('bcryptjs');
        }
        return config;
    },
}

module.exports = nextConfig
