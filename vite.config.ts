import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names[0].endsWith(".css")) {
            return "styles/[name][extname]";
          }
          return "assets/[name][extname]";
        }
      }
    }
  }
});
