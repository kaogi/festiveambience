/**
 * Chargeur d'image personnalisé pour Next.js avec export statique
 * Nécessaire en mode 'export' pour Cloudflare Pages
 * @param {Object} options - Options pour le chargement d'image
 * @param {string} options.src - Chemin source de l'image
 * @param {number} options.width - Largeur souhaitée
 * @param {number} options.quality - Qualité de l'image (0-100)
 * @returns {string} - URL de l'image
 */
export default function imageLoader({ src, width, quality }) {
  // Si c'est une URL externe (comme YouTube), la retourner telle quelle
  if (src.startsWith('http')) {
    return src;
  }
  
  // Sinon, c'est une image locale
  return src;
} 