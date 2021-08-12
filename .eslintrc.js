module.exports = {
  extends: ['airbnb-base-typescript-prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    quotes: ['off'],
    'lines-between-class-members': ['off'],
    'no-console': ['off'],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
    'no-void': ['off'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'class-methods-use-this': ['off'],
    'max-classes-per-file': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'no-underscore-dangle': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
};
