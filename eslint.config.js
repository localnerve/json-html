const js = require('@eslint/js');
const globals = require('globals');

module.exports = [{
  name: 'ignores',
  ignores: [
    'node_modules/**',
    'tmp/**'
  ]
}, {
  name: 'source',
  files: [
    'bin/**',
    'lib/**'
  ],
  languageOptions: {
    globals: {
      ...globals.node
    }
  },
  ...js.configs.recommended
}];
