import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["tcompra.com", "www.tcompra.com"],
    host: true,
    port: 3000,
    headers: {
      "Content-Security-Policy": `
        
        font-src 'self' https://fonts.gstatic.com https://site-assets.fontawesome.com;
        object-src 'none';
        base-uri 'self';
        frame-src 'self'
      `
        .replace(/\s{2,}/g, " ")
        .trim(),
    },
  },
});
