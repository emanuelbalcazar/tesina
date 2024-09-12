// eslint.config.mjs

import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    // Define the file patterns to apply this configuration
    files: ["**/*.js"],

    // Define language options
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        // Add any other global variables you need here
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    // Define plugins used
    plugins: {
      prettier: eslintPluginPrettier,
    },

    // Define rules
    rules: {
      "semi": ["error", "always"],
      "no-constant-binary-expression": "off",
      "no-undef": "off",
      "no-unused-vars": "warn",
    },
  },
];
