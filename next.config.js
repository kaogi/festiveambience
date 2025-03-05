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
  // Déplacer la configuration outputFileTracingRoot hors de experimental
  outputFileTracingRoot: process.env.NODE_ENV === "development" ? undefined : process.cwd(),
  
  // Configuration supplémentaire pour réduire la taille du bundle
  // pour Cloudflare Pages (limite de 25 Mo)
  webpack: (config, { dev, isServer }) => {
    // Ne pas inclure les bibliothèques client dans le bundle serveur
    if (isServer) {
      // Externalize les modules node qui ne devraient pas être bundled
      config.externals.push('three', '@react-three/fiber', '@react-three/drei');
    }
    
    return config;
  }
};