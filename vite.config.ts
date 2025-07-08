import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["tcompra.com", "www.tcompra.com"],
    host: true,
    port: 3000,
  },
});
