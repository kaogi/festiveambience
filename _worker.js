export default {
  async fetch(request, env) {
    // La variable env.__STATIC_CONTENT contient le site Next.js compilé en mode statique
    try {
      const response = await env.__STATIC_CONTENT.fetch(request);
      
      // Ajouter des en-têtes de cache pour améliorer les performances
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=3600');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch (error) {
      // Retourner une page d'erreur en cas de problème
      return new Response(`Une erreur s'est produite: ${error.message}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }
}; 