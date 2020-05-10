const parserOptions = {
  ecmaVersion: 2018,
  sourceTypes: "module",
};

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "airbnb-typescript/base",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
      ],
      parserOptions: {
        ...parserOptions,
        project: "./tsconfig.json",
      },
      rules: {
        "no-console": "off",
        "@typescript-eslint/camelcase": [
          "error",
          {
            properties: "never",
            ignoreDestructuring: true,
          },
        ],
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, variables: false },
        ],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions,
};
