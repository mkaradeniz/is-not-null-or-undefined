import { defineConfig as defineVitestConfig } from 'vitest/config';

const shouldReportBasic = process.env['SHOULD_REPORT_BASIC'] === 'true';

// Vitest configuration
const vitestConfig = defineVitestConfig({
  test: {
    coverage: {
      all: true,
      include: ['lib/**/*.ts'],
      exclude: ['lib/**/*.test.ts'],
      reporter: ['text'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    globals: true,
    // Make the reporter as basic as possible when `shouldReportBasic` is true.
    ...(shouldReportBasic ? { reporters: [['default', { summary: false, includeConsoleOutput: false, isTTY: false }]] } : {}),
    silent: shouldReportBasic,
  },
});

export default vitestConfig;
