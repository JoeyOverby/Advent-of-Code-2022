module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:muralco/recommended',
    'plugin:node/recommended',
  ],
  ignorePatterns: ['node_modules/', '*.d.ts'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports,
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        // we still rely on 'explicit-module-boundary-types' to force typing
        // at module boundaries (i.e. you need to type exported stuff)
        '@typescript-eslint/explicit-function-return-type': 0,
        // we need to disabled explicit module boundaries for now because most
        // of our existing code does not comply. We'll re-enable this rule on a
        // per-layer basis
        '@typescript-eslint/explicit-module-boundary-types': 0,
        // nothing wrong with naming stuff, even if that stuff is just the empty
        // object.
        '@typescript-eslint/no-empty-interface': 0,
        // if you cannot take the time to type something properly maybe we
        // shouldn't be merging this PR
        '@typescript-eslint/no-explicit-any': 2,
        // 'muralco/layers': [2, layers],
        'arrow-body-style': 2,
        'no-extra-boolean-cast': 0,
        'no-case-declarations': 0, // for now
        // allow importing files that are internal to modules (danger)
        'node/no-unpublished-import': 0,
        'node/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['modules'] }, // allow import syntax (transpiled by TS)
        ],
      },
    },
    {
      files: ['*.js'],
      rules: {
        'arrow-parens': 0, // trust prettier
        'function-paren-newline': 0,
        indent: 0, // trust prettier
        'max-len': 0, // trust prettier, don't abuse it!
        'no-confusing-arrow': 0, // controversial, prettier gets rid of ()
        'no-mixed-operators': 0, // learn to live with prettier
        'no-prototype-builtins': 0,
        'no-shadow': ['error', { allow: ['done', 'err', 'cb'] }],
        'no-underscore-dangle': 0,
        'node/no-unpublished-require': 0,
        'object-curly-newline': 0, // trust prettier
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports,
  },
  settings: {
    node: {
      // required by node/no-missing-import (so that it can find TS imports)
      tryExtensions: ['.js', '.ts', '.json'],
    },
  },
};
