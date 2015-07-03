// Choices made by visitor
window.preferences = {};
// Something to trigger/listen to
window.emitter = new EventEmitter();

var restaurants = require('./meal-options');

var makeGuess = require('./lib/makeGuess');
var getCharacteristicsList = require('./lib/getCharacteristicsList');
var Game = require('./components/Game.jsx');

var game = React.render(<Game characteristics={getCharacteristicsList(restaurants)} preferences={preferences} />, document.getElementById('container'));

emitter.on('change', function() {
  game.setState(makeGuess(preferences, restaurants));
});

console.log("code lives at https://github.com/itsjoesullivan/mealgame");
