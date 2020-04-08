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
    isDebug: true
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  plugins: [
    'react'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [
          './'
        ]
      }
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true
    }
  },
  rules: {
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'react/no-danger': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/href-no-hash': 0,
    'linebreak-style': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': 0,
    'react/no-find-dom-node': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0
  },
  plugins: ['css-modules', 'prettier'],
  extends: ['airbnb', 'prettier', 'plugin:css-modules/recommended'],
}

