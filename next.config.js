module.exports = {
  output: 'standalone',
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    unoptimized: true // Important pour Cloudflare Pages
  },
  // Désactiver les vérifications de types pendant le build
  typescript: {
    ignoreBuildErrors: true
  },
  // Désactiver les vérifications ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true
  },
  // Configuration spécifique pour Cloudflare Pages
  experimental: {
    outputFileTracingRoot: process.env.NODE_ENV === "development" ? undefined : process.cwd(),
  }
};