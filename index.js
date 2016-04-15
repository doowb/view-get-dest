/*!
 * view-get-dest <https://github.com/doowb/view-get-dest>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var first = require('get-first');

/**
 * Returns a plugin function that adds a `dest` getter/setter
 * to views. Getter searches for properties that may contain the actual `dest`.
 * By default the properties are `data.permalink`, `data.dest`, and `path`.
 * See [assemble-permalinks][] for details on how to set `data.permalink`.
 *
 * Properties may be overridden by passing in a configuration when setting up the plugin.
 *
 * ```js
 * var config = {
 *   props: ['data.dest', 'data.foo']
 * };
 * app.use(getDest(config));
 * ```
 *
 * @name view-get-dest
 * @param  {Object} `config` Plugin configuration object.
 * @param  {String|Array} `config.props` Array of properties to search on the view for the dest property. Defaults to `['data.permalink', 'data.dest', 'path']`.
 * @return {Function} Plugin function to be passed to `app.use`
 * @api public
 */

module.exports = function(config) {

  config = normalize(config);
  var props = arrayify(config.props || ['data.permalink', 'data.dest', 'path']);

  return function getDest(view) {
    if (this.isRegistered('view-get-dest')) return;
    if (!view.isView && !view.isItem) return getDest;

    /**
     * `.dest` getter/setter on `view` instances
     *
     * ```js
     * var dest = view.dest;
     * // path/to/view/dest
     * ```
     * @name .dest
     * @api public
     */

    Object.defineProperty(view, 'dest', {
      configurable: true,
      set: function(dest) {
        this.data.dest = dest;
      },
      get: function() {
        return first(this, props);
      }
    });
  };
};

function arrayify(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function normalize(config) {
  if (typeof config === 'undefined') {
    config = {};
  }
  if (typeof config === 'string') {
    config = {
      props: [config]
    };
  }
  if (Array.isArray(config)) {
    config = {
      props: config
    };
  }
  return config;
}
