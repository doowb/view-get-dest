'use strict';

var permalink = require('assemble-permalinks');
var assemble = require('assemble');
var assert = require('assert');

var getDest = require('../');
var app;

describe('view-get-dest', function() {
  beforeEach(function() {
    app = assemble();
  });

  it('should add dest property to views', function() {
    app.use(getDest());
    var page = app.page('a.txt', {content: '...'});
    assert.equal(typeof page.dest, 'string');
    assert.equal(page.dest, 'a.txt');
  });

  it('should default to path', function() {
    app.use(getDest());
    var page = app.page('a.txt', {content: '...'});
    assert.equal(page.dest, 'a.txt');
  });

  it('should default to data.dest when set', function() {
    app.use(getDest());
    var page = app.page('a.txt', {content: '...'});
    page.dest = 'a.html'
    assert.equal(page.dest, 'a.html');
  });

  it('should default to data.permalink when set', function() {
    app.use(getDest());
    app.use(permalink('foo/:name.html'));
    var page = app.page('a.txt', {content: '...'});
    assert.equal(page.dest, 'foo/a.html');
  });

  describe('custom properties', function() {
    it('should use custom string', function() {
      app.use(getDest('data.foo'));
      var page = app.page('a.txt', {content: '...', data: {foo: 'foo/bar/a.html' }});
      assert.equal(page.dest, 'foo/bar/a.html');
    });

    it('should use custom array', function() {
      app.use(getDest(['data.bar', 'data.foo']));
      var page = app.page('a.txt', {content: '...', data: {foo: 'foo/bar/a.html' }});
      assert.equal(page.dest, 'foo/bar/a.html');
    });

    it('should use custom object with props string', function() {
      app.use(getDest({props: 'data.foo'}));
      var page = app.page('a.txt', {content: '...', data: {foo: 'foo/bar/a.html' }});
      assert.equal(page.dest, 'foo/bar/a.html');
    });

    it('should use custom object with props array', function() {
      app.use(getDest({props: ['data.bar', 'data.foo']}));
      var page = app.page('a.txt', {content: '...', data: {foo: 'foo/bar/a.html' }});
      assert.equal(page.dest, 'foo/bar/a.html');
    });
  });
});
