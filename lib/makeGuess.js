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
