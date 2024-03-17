/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-param-reassign': 0,
    "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
    'vue/max-attributes-per-line': 0,
    'vue/max-len': ['warn', {
      code: 128,
      tabWidth: 2,
      template: 128,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
    }],
  }
}
