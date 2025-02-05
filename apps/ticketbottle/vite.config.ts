import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { join } from 'path';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: join(__dirname, 'src/routes'),
      generatedRouteTree: join(__dirname, 'src/routeTree.gen.ts'),
      quoteStyle: 'single',
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 5544,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        '...',
        '..',
        '../../node_modules',
      ],
    },
  },
});
