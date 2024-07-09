import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    settings: {
      react: {
        version: "detect", // Tự động phát hiện phiên bản React
      },
    },
  },
  {
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: [
        "error",
        2,
        {
          MemberExpression: "off",
          SwitchCase: 1,
        },
      ],
      "jsx-quotes": ["error", "prefer-double"],
      "no-use-before-define": "off",
      "no-control-regex": 0,
      "no-unused-vars": ["error"],
      "no-param-reassign": "off",
      "linebreak-style": 0,
      "object-curly-newline": "off",
      eqeqeq: ["error", "always"],
      "function-paren-newline": "off",
      "implicit-arrow-linebreak": "off",
      "operator-linebreak": "off",
      "prefer-const": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "react/jsx-indent": ["error", 2],

      "react/jsx-one-expression-per-line": "off",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "import/extensions": 0,
      "import/no-unresolved": 0,
      "import/prefer-default-export": 0,
      "import/no-extraneous-dependencies": "off",
      "import/no-mutable-exports": "off",
    },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
