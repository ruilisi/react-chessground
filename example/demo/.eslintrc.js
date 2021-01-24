module.exports = {
  globals: {
    CONFIG: true,
    DISPATCH: true,
    NODE_ENV: true,
    PROJECT_NAME: true,
    QINIU_HOST: true,
    REMOTE_HOSTS: true,
    ROOT_NODE: true,
    STATE: true,
    STORE: true,
    WECHAT_ENABLED: true,
    wx: true,
    Raven: true,
    particlesJS: true,
    isDebug: true,
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["./"],
      },
    },
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  rules: {
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", "tsx"] }],
  },
  plugins: [
    "css-modules",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  extends: ["airbnb", "prettier", "plugin:css-modules/recommended"],
  overrides: {
    files: ["**/*.ts"],
    parser: "typescript-eslint-parser",
    rules: {
      "no-undef": "off",
    },
  },
};
