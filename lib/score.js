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
