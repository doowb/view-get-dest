# view-get-dest [![NPM version](https://img.shields.io/npm/v/view-get-dest.svg)](https://www.npmjs.com/package/view-get-dest) [![Build Status](https://img.shields.io/travis/doowb/view-get-dest.svg)](https://travis-ci.org/doowb/view-get-dest)

> Assemble plugin to add a dest property to views.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install view-get-dest --save
```

## Usage

```js
var getDest = require('view-get-dest');
```

## API

### [getDest](index.js#L33)

Returns a plugin function that adds a `dest` getter/setter to views. Getter searches for properties that may contain the actual `dest`. By default the properties are `data.permalink`, `data.dest`, and `path`. See [assemble-permalinks](https://github.com/assemble/assemble-permalinks) for details on how to set `data.permalink`.

Properties may be overridden by passing in a configuration when setting up the plugin.

**Params**

* `config` **{Object}**: Plugin configuration object.
* `config.props` **{String|Array}**: Array of properties to search on the view for the dest property. Defaults to `['data.permalink', 'data.dest', 'path']`.
* `returns` **{Function}**: Plugin function to be passed to `app.use`

**Example**

```js
var config = {
  props: ['data.dest', 'data.foo']
};
app.use(getDest(config));
```

### [.dest](index.js#L53)

`.dest` getter/setter on `view` instances

**Example**

```js
var dest = view.dest;
// path/to/view/dest
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/view-get-dest/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/view-get-dest/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 15, 2016._
