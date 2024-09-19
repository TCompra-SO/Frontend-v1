import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones desde cualquier IP
    port: 3000, // El puerto en el que Vite está corriendo
  },
});
