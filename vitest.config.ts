import { defineConfig as defineVitestConfig } from 'vitest/config';

const shouldReportBasic = process.env['SHOULD_REPORT_BASIC'] === 'true';

// Vitest configuration
const vitestConfig = defineVitestConfig({
  test: {
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    globals: true,
    // Make the reporter as basic as possible when `shouldReportBasic` is true.
    ...(shouldReportBasic ? { reporters: [['default', { summary: false, includeConsoleOutput: false, isTTY: false }]] } : {}),
    silent: shouldReportBasic,
  },
});

export default vitestConfig;
