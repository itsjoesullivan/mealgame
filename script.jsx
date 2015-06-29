window.choices = {};
window.emitter = new EventEmitter();

var App = require('./components/App.jsx');

function makeGuess(choices) {
  var matches = [];
  var matches = options.map(function(option) {
    return {
      name: option.name,
      score: score(choices, option.characteristics)
    }
  });
  var bestMatch = _.sortBy(matches, function(match) {
    return match.score;
  })[0];
  return bestMatch;
}

function score(a, b) {
  var total = 0;
  var matchCount = 0;
  _.each(a, function(val, key) {
    if (b[key]) {
      total += Math.abs(val - b[key]);
      matchCount++;
    }
  });
  return total;
}

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

var game = React.render(<App characteristics={getCharacteristicsList()} choices={choices} />, document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(window.choices));
});
