/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'standard',
    'standard-jsx'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
