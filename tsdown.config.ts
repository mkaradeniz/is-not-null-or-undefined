import { defineConfig } from 'tsdown';

const tsdownConfig = defineConfig(defaultOptions => {
  return {
    clean: true,
    dts: {
      sourcemap: false,
    },
    entry: ['lib/index.ts', 'lib/react.ts'],
    exports: false,
    format: ['esm'],
    outDir: 'dist',
    sourcemap: true,
    tsconfig: './tsconfig.json',
    ...defaultOptions,
  };
});

export default tsdownConfig;
