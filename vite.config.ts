import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["tcompra.com"],
    host: true, // Esto permite aceptar conexiones externas
    port: 3000, // o el puerto que estés usando
  },
});
