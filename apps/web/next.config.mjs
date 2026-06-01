/**
 * @format
 * @module NextConfig
 * @description Next.js runtime configuration for the web app.
 * @author auto
 * @since 1.0.0
 */

const nextConfig = {
    allowedDevOrigins: ['127.0.0.1'],
    basePath: '/FirstDay',
    images: {
        unoptimized: true,
    },
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    transpilePackages: ['@onboarding/ui', '@onboarding/schemas', '@onboarding/types'],
    sassOptions: {
        includePaths: ['./src/styles'],
    },
};

export default nextConfig;
