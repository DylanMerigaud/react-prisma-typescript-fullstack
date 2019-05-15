module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: ["error", "never"],
    "comma-dangle": ["error", "always"],
    "prefer-arrow-callback": "error",
  },
}
