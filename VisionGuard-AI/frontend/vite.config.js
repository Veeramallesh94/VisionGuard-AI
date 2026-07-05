import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config - handles bundling and the local dev server
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend runs here: http://localhost:5173
  },
});
