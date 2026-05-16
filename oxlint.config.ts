import { defineConfig } from 'oxlint';

export default defineConfig({
  env: {
    builtin: true,
    node: true,
  },
  ignorePatterns: ['coverage/**', 'dist/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['typescript'],
      rules: {
        'constructor-super': ['off'],
        'getter-return': ['off'],
        'no-class-assign': ['off'],
        'no-const-assign': ['off'],
        'no-dupe-class-members': ['off'],
        'no-dupe-keys': ['off'],
        'no-func-assign': ['off'],
        'no-import-assign': ['off'],
        'no-new-native-nonconstructor': ['off'],
        'no-obj-calls': ['off'],
        'no-redeclare': ['off'],
        'no-setter-return': ['off'],
        'no-this-before-super': ['off'],
        'no-unreachable': ['off'],
        'no-unsafe-negation': ['off'],
        'typescript/consistent-type-imports': [
          'warn',
          {
            fixStyle: 'inline-type-imports',
            prefer: 'type-imports',
          },
        ],
        'typescript/no-explicit-any': ['warn'],
        'typescript/no-extra-non-null-assertion': ['warn'],
        'typescript/no-non-null-assertion': ['warn'],
      },
    },
  ],
  rules: {
    curly: ['warn', 'all'],
    eqeqeq: ['warn'],
    'no-console': ['warn', { allow: ['error', 'info', 'warn'] }],
    'no-debugger': ['warn'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'no-var': ['warn'],
    'object-shorthand': ['warn'],
    'prefer-const': ['warn'],
  },
});
