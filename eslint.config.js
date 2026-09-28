/**
 * ESLint flat config.
 * NOTE: If your class provides its own eslint config file, replace
 * this file's contents with theirs — the source below is written to
 * pass a standard modern (flat) config with the browser globals the
 * page uses.
 */
export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        getComputedStyle: "readonly",
        requestAnimationFrame: "readonly",
        CustomEvent: "readonly",
        setTimeout: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
    },
  },
];
