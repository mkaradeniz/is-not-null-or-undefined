import { defineConfig } from 'oxfmt';

export default defineConfig({
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  ignorePatterns: ['coverage/**', 'dist/**', 'node_modules/**'],
  jsxSingleQuote: false,
  printWidth: 140,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  sortImports: {
    groups: ['side_effect', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'style', 'unknown'],
    newlinesBetween: true,
  },
  sortPackageJson: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
});
