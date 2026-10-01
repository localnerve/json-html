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
  ignores: [
    'lib/renderjson.js'
  ],
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
}, {
  name: 'old-window-source',
  files: [
    'lib/renderjson.js'
  ],
  languageOptions: {
    globals: {
      ...globals.browser
    }
  },
  ...js.configs.recommended
}];
