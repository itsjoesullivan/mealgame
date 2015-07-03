var getCharacteristicsList = require('../getCharacteristicsList');
var assert = require('assert');
var _ = require('underscore');

// TODO: put this fake data in its own place to make it
// easier to update if data model changes
var fakeRestaurants = [
  {
    name: 'test',
    characteristics: {
      "a": 1,
      "b": 2
    }
  },
  {
    name: 'test2',
    characteristics: {
      "b": 1,
      "c": 2
    }
  }
];

describe('getCharacteristicsList', function() {
  it('returns an array', function() {
    assert.ok(_.isArray(getCharacteristicsList([])));
  });
  it('returns a list of the characteristics of the restaurants', function() {
    var list = getCharacteristicsList(fakeRestaurants);
    assert.ok(list.indexOf('a') !== -1);
    assert.ok(list.indexOf('b') !== -1);
    assert.ok(list.indexOf('c') !== -1);
  });
  it('doesn\'t include duplicates', function() {
    var list = getCharacteristicsList(fakeRestaurants);
    assert.equal(list.length, 3);
  });
});
