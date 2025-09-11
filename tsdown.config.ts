import { defineConfig } from 'tsdown';

const tsdownConfig = defineConfig(defaultOptions => {
  return {
    dts: true,
    clean: true,
    entry: ['lib/index.ts'],
    format: ['esm'],
    sourcemap: true,
    tsconfig: './tsconfig.json',
    outDir: 'dist',
    ...defaultOptions,
  };
});

export default tsdownConfig;
