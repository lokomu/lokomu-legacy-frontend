module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.vue']
  },
  plugins: ["@typescript-eslint", "vue"],
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "linebreak-style": "off",
    "semi": ["warn", "always"]
  },
  overrides: [
    {
      files: [
        "*.vue",
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: ['.vue'],
      },
      env: {
        jest: true,
      },
    },
  ],
};