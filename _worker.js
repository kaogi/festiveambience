export default {
  async fetch(request, env) {
    // La variable env.__STATIC_CONTENT contient le site Next.js compilé
    const response = await env.__STATIC_CONTENT.fetch(request);
    return response;
  }
}; 