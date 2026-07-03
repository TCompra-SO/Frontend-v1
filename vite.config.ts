import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["tcompra.com", "www.tcompra.com"],
    host: true,
    port: 3000,
    // Apagamos el overlay por si acaso queda algún residuo en el navegador
    hmr: {
      overlay: false,
    },
    headers: {
      // Escribimos la CSP en una sola línea limpia para evitar que Vite rompa el decodeURI
      "Content-Security-Policy":
        "font-src 'self' https://fonts.gstatic.com https://site-assets.fontawesome.com; object-src 'none'; base-uri 'self'; frame-src 'self';",
    },
  },
});
