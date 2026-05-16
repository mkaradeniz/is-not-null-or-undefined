import { defineConfig } from 'tsdown';

const tsdownConfig = defineConfig(defaultOptions => {
  return {
    dts: true,
    clean: true,
    entry: ['lib/index.ts', 'lib/react.ts'],
    format: ['esm'],
    sourcemap: true,
    tsconfig: './tsconfig.json',
    outDir: 'dist',
    exports: false,
    ...defaultOptions,
  };
});

export default tsdownConfig;
