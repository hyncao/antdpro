const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  rules: {
    'eslint-comments/disable-enable-pair': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'generator-star-spacing': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/sort-comp': 'off',
  },
};
