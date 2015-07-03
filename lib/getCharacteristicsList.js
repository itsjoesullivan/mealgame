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
