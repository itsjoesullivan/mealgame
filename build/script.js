(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("label", null, this.props.name), 
        React.createElement("br", null), 
        React.createElement("input", {type: "range", min: "0", max: "10", step: "1", onChange: this.onChange})
      )
    );
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
    var rows = [];
    this.props.characteristics.forEach(function(characteristic) {
      rows.push(React.createElement(Characteristic, {name: characteristic}));
    });
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Mealgame"), 
        rows, 
        React.createElement(Guess, {name: this.state.name, score: this.state.score})
      )
    );
  }
});


},{"./Characteristic.jsx":1,"./Guess.jsx":3}],3:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {};
  },
  render: function() {
    if (typeof this.props.score === 'number') {
      return (
        React.createElement("div", null, 
          "You should eat: ", this.props.name
        )
      );
    } else {
      return (
        React.createElement("div", null, 
          "No guess yet!"
        )
      );
    }
  }
});


},{}],4:[function(require,module,exports){
window.preferences = {};
window.emitter = new EventEmitter();
var Game = require('./components/Game.jsx');

/**
 * Return the best restaurant match based on 
 * preferences.
 */
function makeGuess(preferences) {
  var matches = [];
  var matches = options.map(function(option) {
    return {
      name: option.name,
      score: score(preferences, option.characteristics)
    }
  });
  var bestMatch = _.sortBy(matches, function(match) {
    return match.score;
  })[0];
  return bestMatch;
}

/**
 * Return an integer score (lower better)
 * that is the difference between 
 */
function score(preferences, restaurant) {
  var total = 0;
  var matchCount = 0;
  _.each(preferences, function(val, key) {
    if (restaurant[key]) {
      total += Math.abs(val - restaurant[key]);
      matchCount++;
    }
  });
  return total;
}

/**
 * Get a list of the names of characteristics
 * present in the meal choices, e.g. how "spicy"
 */
function getCharacteristicsList() {
  var characteristics = [];
  options.forEach(function(option) {
    _.each(option.characteristics, function(val, key) {
      if (characteristics.indexOf(key) === -1) {
        characteristics.push(key);
      }
    });
  });
  return characteristics;
}

var game = React.render(React.createElement(Game, {characteristics: getCharacteristicsList(), preferences: preferences}), document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(preferences));
});


},{"./components/Game.jsx":2}]},{},[4]);
