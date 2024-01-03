import react from '@vitejs/plugin-react';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { name } from './package.json';

const app = async () => {
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name;

  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: (format) => `${formattedName}.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
      },
    },
  });
};

export default app;
