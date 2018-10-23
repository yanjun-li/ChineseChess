module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: "eslint:recommended",
  rules: {
    'no-console': 0
  }
}