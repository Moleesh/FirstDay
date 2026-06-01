/**
 * @format
 * @module NextConfig
 * @description Next.js runtime configuration for the web app.
 * @author auto
 * @since 1.0.0
 */

const nextConfig = {
    basePath: '/FirstDay',
    reactStrictMode: true,
    async redirects() {
        return [
            { basePath: false, destination: '/FirstDay', permanent: false, source: '/' },
            { basePath: false, destination: '/FirstDay/login', permanent: false, source: '/login' },
            {
                basePath: false,
                destination: '/FirstDay/dashboard',
                permanent: false,
                source: '/dashboard',
            },
            {
                basePath: false,
                destination: '/FirstDay/onboarding',
                permanent: false,
                source: '/onboarding',
            },
        ];
    },
    transpilePackages: ['@onboarding/ui', '@onboarding/schemas', '@onboarding/types'],
    sassOptions: {
        includePaths: ['./src/styles'],
    },
};

export default nextConfig;
