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
  define: {
    'process.env': {
      SATANG_WEB_SOCKET: 'wss://ws.satangcorp.com/ws/!miniTicker@arr'
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});