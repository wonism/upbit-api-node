const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['import'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    '$Diff': true,
  },
  rules: {
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'function-paren-newline': [error, 'consistent'],
    'global-require': off,
    'import/extensions': off,
    'import/no-deprecated': warn,
    'import/no-unresolved': off,
    'import/prefer-default-export': off,
    indent: off,
    'lines-between-class-members': [error, 'always', { exceptAfterSingleLine: true }],
    'max-len': [error, 200, { ignoreComments: true }],
    'no-console': off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-undef': off,
    'no-underscore-dangle': off,
    'no-unused-vars': [
      error, {
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: 'Fragment',
      },
    ],
    'object-curly-newline': [error, { consistent: true }],
    'prefer-spread': off,
    'quotes': [error, 'single'],
  },
  parser: 'babel-eslint',
  overrides: [
    {
      files: ['src/utils/*.js'],
      rules: {
        'no-lonely-if': false,
        'no-param-reassign': false,
      },
    },
    {
      files: ['src/**/*.test.js'],
      rules: {
        'max-len': off,
        'no-undef': off,
      },
    },
  ],
};
