/** @type {import('next').NextConfig} */

// `output: 'export'` is required for the GitHub Pages deploy but breaks
// `generateStaticParams` discovery during `next dev`. Only apply it for
// production builds so dev mode can serve dynamic routes normally.
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    ...(isProd ? { output: 'export' } : {}),
    basePath: "", assetPrefix: "/",
}

module.exports = nextConfig
