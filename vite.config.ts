import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: "Mustafa's Mattress",
        short_name: "Mustafa's",
        description: "India's most trusted mattresses.",
        theme_color: "#4F8EF7",
        background_color: "#ffffff",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "192x192 512x512",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    sourcemap: mode !== "production",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "@radix-ui/react-popover", "@radix-ui/react-tabs", "@radix-ui/react-accordion"],
          charts: ["recharts"],
        },
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
