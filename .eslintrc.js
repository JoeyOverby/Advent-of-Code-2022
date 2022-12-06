module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:muralco/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports,
      },
      rules: {
        // we still rely on 'explicit-module-boundary-types' to force typing
        // at module boundaries (i.e. you need to type exported stuff)
        '@typescript-eslint/explicit-function-return-type': 0,
        // we need to disabled explicit module boundaries for now because most
        // of our existing code does not comply. We'll re-enable this rule on a
        // per-layer basis
        '@typescript-eslint/explicit-module-boundary-types': 0,
        // roses are red, violets are blue, variables are camelCase and types
        // are PascalCase
        '@typescript-eslint/naming-convention': [
          2,
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'enumMember',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
        // nothing wrong with naming stuff, even if that stuff is just the empty
        // object.
        '@typescript-eslint/no-empty-interface': 0,
        // if you cannot take the time to type something properly maybe we
        // shouldn't be merging this PR
        '@typescript-eslint/no-explicit-any': 2,
        // disallow unused variables unless their names begin with an underscore
        '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
        // do not allow imports that include src/ (VSCode sometimes goes crazy
        // and suggests imports from data/src that break the build in CI).
        'arrow-body-style': 2,
        'no-extra-boolean-cast': 0,
        'no-case-declarations': 0, // for now
        'no-restricted-imports': [
          2,
          {
            name: 'aws-sdk',
            message:
              "Import the specific service client instead: for example `import Athena from 'aws-sdk/clients/athena'`",
          },
        ],
        // allow importing files that are internal to modules (danger)
        'node/no-unpublished-import': 0,
        'node/no-unsupported-features/es-syntax': [
          'error',
          { ignores: ['modules'] }, // allow import syntax (transpiled by TS)
        ],

        'arrow-parens': 0, // trust prettier
        'function-paren-newline': 0,
        indent: 0, // trust prettier
        'max-len': 0, // trust prettier, don't abuse it!
        'no-confusing-arrow': 0, // controversial, prettier gets rid of ()
        'no-mixed-operators': 0, // learn to live with prettier
        'no-prototype-builtins': 0,

        'no-underscore-dangle': 0,
        'node/no-unpublished-require': 0, // all those `/dist/` requires
        'object-curly-newline': 0, // trust prettier

        // Trying to get Enum's to work
        // 'no-shadow': ['error', { allow: ['done', 'err', 'cb'] }],

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
    // Type-check tests intentionally break the build and therefore cannot live
    // inside src/. Since they are not in src/ they need to be able to import
    // stuff from src/.
    { files: ['type-checks/*.ts'], rules: { 'muralco/bounded-imports': 0 } },
  ],
  rules: {
    'node/global-require': 2,
  },
  settings: {
    node: {
      // required by node/no-missing-import (so that it can find TS imports)
      tryExtensions: ['.js', '.ts', '.json'],
    },
  },
};
