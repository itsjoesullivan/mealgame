(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    return React.createElement("div", null, 
      React.createElement("label", null, this.props.name), 
      React.createElement("br", null), 
      React.createElement("input", {type: "range", min: "0", max: "10", step: "1", onChange: this.onChange})
    )
  },
  onChange: function(e) {
    preferences[this.props.name] = parseInt(e.target.value);
    emitter.trigger('change');
  }
});


},{}],2:[function(require,module,exports){
var Characteristic = require('./Characteristic.jsx');
var Guess = require('./Guess.jsx');

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {};
  },
  render: function() {
    return React.createElement("div", null, 
      React.createElement("h1", null, "Mealgame"), 
      this.props.characteristics.map(function(characteristic) {
        return React.createElement(Characteristic, {name: characteristic})
      }), 
      React.createElement(Guess, {name: this.state.name, score: this.state.score})
    )
  }
});


},{"./Characteristic.jsx":1,"./Guess.jsx":3}],3:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    if (typeof this.props.score === 'number') {
      return React.createElement("div", null, 
        "You should eat: ", this.props.name
      )
    } else {
      return React.createElement("div", null, 
        "No guess yet!"
      )
    }
  }
});


},{}],4:[function(require,module,exports){
/**
 * Get a list of the names of characteristics
 * present in the meal choices, e.g. how "spicy"
 */
module.exports = function getCharacteristicsList(restaurants) {
  return restaurants
    .reduce(function(list, restaurant) {
      return list.concat(Object.keys(restaurant.characteristics));
    }, [])
    .reduce(function(list, characteristicName) {
      if (list.indexOf(characteristicName) === -1) {
        list.push(characteristicName);
      }
      return list;
    }, []);
};


},{}],5:[function(require,module,exports){
var score = require('./score');

/**
 * Return the best restaurant match based on 
 * preferences.
 */
module.exports = function makeGuess(preferences, restaurants) {
  return _(restaurants.map(function(restaurant) {
    return {
      name: restaurant.name,
      score: score(preferences, restaurant.characteristics)
    }
  })).sortBy(function(restaurant) {
    return restaurant.score;
  })[0];
};


},{"./score":6}],6:[function(require,module,exports){
/**
 * Return an integer score (lower better)
 * that is the difference between an individual
 * restaurant and the visitor's preference
 */
module.exports = function score(preferences, restaurant) {
  var total = 0;
  var matchCount = 0;
  Object.keys(preferences).forEach(function(key) {
    if (restaurant[key]) {
      total += Math.abs(preferences[key] - restaurant[key]);
      matchCount++;
    }
  });
  return total;
};


},{}],7:[function(require,module,exports){
/**
 * List of meal options along with their characteristics.
 *
 * All characteristics should make sense on a log 0-10 scale.
 * For example, {hotness: 10} is equal to the temperature
 * at the center of the sun, whereas {hotness:0} is so cold
 * that electrons would stop circling their atomic nuclei.
 */
module.exports = [
  {
    name: "Chipotle",
    characteristics: {
      spicy: 6,
      meaty: 6,
      wet: 5
    }
  },
  {
    name: "Chop't",
    characteristics: {
      meaty: 3,
      spicy: 4,
      wet: 7
    }
  },
  {
    name: "Shake Shack",
    characteristics: {
      meaty: 9,
      spicy: 1,
      wet: 6
    }
  },
  {
    name: "Sushi",
    characteristics: {
      meaty: 7,
      spicy: 5,
      wet: 5
    }
  }
  /*
  {
    name: "Iris Cafe",
    characteristics: {
      freshness: 6,
      creativity: 4
    }
  }
  */
];


},{}],8:[function(require,module,exports){
// Choices made by visitor
window.preferences = {};
// Something to trigger/listen to
window.emitter = new EventEmitter();

var restaurants = require('./meal-options');

var makeGuess = require('./lib/makeGuess');
var getCharacteristicsList = require('./lib/getCharacteristicsList');
var Game = require('./components/Game.jsx');

var game = React.render(React.createElement(Game, {characteristics: getCharacteristicsList(restaurants), preferences: preferences}), document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(preferences, restaurants));
});

console.log("code lives at https://github.com/itsjoesullivan/mealgame");


},{"./components/Game.jsx":2,"./lib/getCharacteristicsList":4,"./lib/makeGuess":5,"./meal-options":7}]},{},[8]);
