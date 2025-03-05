module.exports = {
  // Export statique pour Cloudflare Pages
  output: 'export',
  
  // Configuration des images statiques
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    unoptimized: true, // Nécessaire pour Cloudflare Pages
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.js'
  },
  
  // Désactiver les vérifications pendant le build
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  
  // Configuration pour Next.js
  outputFileTracingRoot: process.env.NODE_ENV === "development" ? undefined : process.cwd(),
  
  // Optimisations pour réduire la taille du bundle
  webpack: (config, { dev, isServer }) => {
    // Optimisations côté serveur
    if (isServer) {
      // Externaliser framer-motion pour des builds plus légers
      config.externals.push('framer-motion');
    }
    
    // Optimisations côté client
    if (!isServer) {
      // Activer la compression et la minification
      config.optimization.minimize = true;
      
      // Désactiver les source maps en production
      if (!dev) {
        config.devtool = false;
      }
      
      // Optimiser le chunking pour des fichiers plus petits
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
          },
        },
      };
    }
    
    return config;
  },
  
  // Configuration pour génération statique
  trailingSlash: true
};