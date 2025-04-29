export default {
    async fetch(request) {
      const html = await fetch("https://raw.githubusercontent.com/your-username/your-repo/main/index.html").then(res => res.text());
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    }
  }
  