import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/entrypoints/frontend",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
    },
    port: 5100,
  },
  build: {
    outDir: "../../../.local/vite/dist",
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: "index.html",
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
