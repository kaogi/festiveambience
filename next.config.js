module.exports = {
  output: 'export',
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    unoptimized: true, // Nécessaire pour Cloudflare Pages
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.js'
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
  
  // Optimisations supplémentaires pour réduire la taille du bundle
  webpack: (config, { dev, isServer }) => {
    // Ne pas inclure les bibliothèques client volumineuses dans le bundle serveur
    if (isServer) {
      const externals = ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'];
      config.externals.push(...externals);
    }
    
    // Optimisations supplémentaires pour réduire la taille du bundle client
    if (!isServer) {
      // Activer la compression et la minification avancée
      config.optimization.minimize = true;
      
      // Désactivation du source map en production
      if (!dev) {
        config.devtool = false;
      }
      
      // Segmenter le bundle en plus petits morceaux
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 20000000, // 20 Mo max par chunk
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
            priority: 10,
          },
          threejs: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'vendor.threejs',
            priority: 20,
          },
        },
      };
    }
    
    return config;
  },
  
  // Désactiver le serveur pour une génération statique complète
  trailingSlash: true
};