var mealOptions = require('../../meal-options');
var isRestaurant = require('../isRestaurant');
var assert = require('assert');

describe("Restaurants", function() {
  it("each one is valid", function() {
    mealOptions.forEach(function(restaurant) {
      if (!isRestaurant(restaurant)) {
        throw new Error("Restaurant not valid: " + restaurant.name);
      }
    });
  });
});
