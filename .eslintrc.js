module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 'warn',
    'standard/no-callback-literal': 'off',
    'vue/no-unused-components': 'warn',
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 6
      },
      "multiline": {
        "max": 1
      }
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  globals: {
    $axure: "readonly"
  }
}
