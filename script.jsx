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

var game = React.render(<Game characteristics={getCharacteristicsList()} preferences={preferences} />, document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(preferences));
});
