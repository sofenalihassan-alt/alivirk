import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/projects";

const staticPaths = ["/", "/about", "/expertise", "/projects", "/experience", "/learning", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [...staticPaths, ...projects.filter((p) => !p.isPlaceholder).map((p) => `/projects/${p.slug}`)];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
