// Choices made by visitor
window.preferences = {};

// Something to trigger/listen to
window.emitter = new EventEmitter();

var Game = require('./components/Game.jsx');
var game = React.render(<Game characteristics={getCharacteristicsList()} preferences={preferences} />, document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(preferences));
});

/**
 * Return the best restaurant match based on 
 * preferences.
 */
function makeGuess(preferences) {
  return _(options.map(function(option) {
    return {
      name: option.name,
      score: score(preferences, option.characteristics)
    }
  })).sortBy(function(restaurant) {
    return restaurant.score;
  })[0];
}

/**
 * Return an integer score (lower better)
 * that is the difference between 
 */
function score(preferences, restaurant) {
  var total = 0;
  var matchCount = 0;
  Object.keys(preferences).forEach(function(key) {
    if (restaurant[key]) {
      total += Math.abs(preferences[key] - restaurant[key]);
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
  return options
    .reduce(function(list, restaurant) {
      return list.concat(Object.keys(restaurant.characteristics));
    }, [])
    .reduce(function(list, characteristicName) {
      if (list.indexOf(characteristicName) === -1) {
        list.push(characteristicName);
      }
      return list;
    }, []);
}

 console.log("code lives at https://github.com/itsjoesullivan/mealgame");
