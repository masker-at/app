module.exports = {
  extends: ['airbnb-typescript-prettier', 'preact'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    quotes: 'off',
    'lines-between-class-members': ['off'],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
    '@typescript-eslint/no-empty-function': ['off'],
    'no-underscore-dangle': ['off'],
    'react/state-in-constructor': ['error', 'never'],
    'react/destructuring-assignment': ['off'],
    'no-void': ['off'],
    'react/jsx-fragments': ['off'],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either',
        depth: 3,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'no-unused-vars': ['off']
  }
};
