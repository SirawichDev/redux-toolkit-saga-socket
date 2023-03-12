import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, 
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});