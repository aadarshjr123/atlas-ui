import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react-markdown") ||
            id.includes("node_modules/remark") ||
            id.includes("node_modules/unified") ||
            id.includes("node_modules/micromark") ||
            id.includes("node_modules/mdast") ||
            id.includes("node_modules/hast") ||
            id.includes("node_modules/unist") ||
            id.includes("node_modules/vfile")
          ) {
            return "markdown";
          }
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react-vendor";
          if (id.includes("node_modules/@radix-ui")) return "radix";
          if (id.includes("/packages/ai/")) return "atlas-ai";
          if (id.includes("/packages/core/")) return "atlas-core";
          if (id.includes("/packages/hooks/")) return "atlas-hooks";
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
