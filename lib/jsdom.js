/**
 * Copyright (c) 2017 - 2024 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License.
 *
 * Start/stop jsdom environment
 */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * Wrap the JSDOM API.
 *
 * @param {String} markup - The markup to init JSDOM with.
 * @param {Object} options - The options to init JSDOM with.
 * @returns {Object} with win, doc, and nav.
 */
function createJSDOM (markup, options) {
  const dom = new JSDOM(markup, options);
  return {
    win: dom.window,
    doc: dom.window.document,
    nav: dom.window.navigator,
    serialize: dom.serialize.bind(dom),
  };
}

/**
 * Shim document, window, and navigator with jsdom if not defined.
 * Init document with markup if specified.
 * Add globals if specified.
 *
 * @param {String} markup - The markup to init the DOM with.
 * @param {Object} options - The JSDOM options to start the DOM with.
 * @param {Object} addGlobals - Additional globals to add to global window.
 * @returns {Array} Collection of global keys added to the global window.
 */
function start (markup, options, addGlobals) {
  if (typeof document !== 'undefined') {
    return;
  }

  if (options && options.suppressJSDOMError) {
    const virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.sendTo(console, {
      omitJSDOMErrors: true
    });
    options.virtualConsole = virtualConsole;
    delete options.suppressJSDOMError;
  }

  const globalKeys = [];

  const { win, doc, nav, serialize } = createJSDOM(
    markup || '<!doctype html><html><body></body></html>', options
  );

  global.document = doc;
  global.window = win;
  global.navigator = nav;

  if (addGlobals) {
    Object.keys(addGlobals).forEach((key) => {
      global.window[key] = addGlobals[key];
      globalKeys.push(key);
    });
  }

  return {
    globalKeys,
    serialize
  };
}

/**
 * Remove globals, stop and delete window.
 */
function stop (globalKeys) {
  if (globalKeys) {
    globalKeys.forEach((key) => {
      delete global.window[key];
    });
  }

  global.window.close();

  delete global.document;
  delete global.window;
  delete global.navigator;
}

module.exports = {
  start,
  stop
};
