module.exports = {
  parser: 'babel-eslint',
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
    browser: true

  },
  rules: {
    'react/no-danger': 0,
    'react/prop-types': 0,
    "class-methods-use-this": "off",
    'import/no-extraneous-dependencies': ['error', { packageDir: '.'  }],
    'react/forbid-prop-types': ['any', 'array'],
    'react/jsx-no-bind': [
      true,
      {
        ignoreDOMComponents: true

      }

    ],
    'import/first': 'none',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true  }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx']  }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']

      }

    ],
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/anchor-has-content': [0],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton']

      }

    ],
    'prettier/prettier': 'error'

  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'

  },
  extends: ['airbnb', 'plugin:css-modules/recommended', 'prettier', 'prettier/flowtype', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['css-modules', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src']
      }
    }
  }
}

