import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const windowsConfig = { server: { watch: { usePolling: true, interval: 1 } } }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cowculator/",
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
  ...(process.platform === 'win32' ? windowsConfig : {}),
});
