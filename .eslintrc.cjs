module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    rules: {
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    },
  }