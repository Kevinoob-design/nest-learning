module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "sonarjs",
    "simple-import-sort",
    "import",
    "spellcheck"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [ ".eslintrc.js", "dist", "migrations" ],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
     
    "space-in-parens": [ "error", "never" ],
    "sonarjs/no-useless-catch": "off",
    "object-shorthand": [
      "error", "always", { "avoidQuotes": true }
    ],
    "prefer-destructuring": [
      "error", { "object": true, "array": true }
    ],
    "object-curly-newline": [
      "error", {
        "ObjectExpression": { "multiline": true, "minProperties": 2 },
        "ObjectPattern": { "multiline": true, "minProperties": 4 },
        // "ImportDeclaration": { "multiline": true, "minProperties": 4 },
        // "ExportDeclaration": { "multiline": true, "minProperties": 4 }
      }
    ],
    "array-element-newline": [
      "error", {
        "ArrayExpression": "consistent",
        "ArrayPattern": { "multiline": true },
      }
    ],
    // "array-bracket-spacing": [
    //   "error", "always", {
    //     "singleValue": false,
    //     "objectsInArrays": true,
    //     "arraysInArrays": false
    //   }
    // ],
    // "spellcheck/spell-checker": [
    //   "warn",
    //   {
    //     "lang": "en_US",
    //     "minLength": 1
    //   }
    // ],
    "space-before-blocks": [
      "error",
      { "functions": "always", "keywords": "always", "classes": "always" },
    ],
    "space-before-function-paren": [
      "off", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "const", "next": "expression" },
      { "blankLine": "always", "prev": "*", "next": "return" },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { "exceptAfterSingleLine": true },
    ]
  },
};
