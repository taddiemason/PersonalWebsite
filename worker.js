export default {
  async fetch(request, env, ctx) {
    try {
      const response = await fetch("https://raw.githubusercontent.com/taddiemason/PersonalWebsite/main/Core.html");

      if (!response.ok) {
        return new Response("Failed to fetch HTML content.", { status: 500 });
      }

      const html = await response.text();

      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
}
