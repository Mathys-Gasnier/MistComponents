import { resolve } from 'path';

import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';

import * as packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/components/'],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'MistComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `mist-components.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys({ ...packageJson, ...{ peerDependencies: {} } }.peerDependencies)],
    },
  },
});
