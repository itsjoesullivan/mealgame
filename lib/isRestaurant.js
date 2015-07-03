var _ = require('underscore');

/** Check that an object qualifies as a restaurant.
 */
module.exports = function(candidate) {
  if (!candidate.name) {
    return false;
  }
  return isCharacteristicList(candidate.characteristics);
};

/** Check that an object is a list of characteristics
 */
function isCharacteristicList(candidate) {
  if (typeof candidate !== 'object') {
    return false;
  }
  // TODO: iterate over keys to ensure all vals are 0-10
  return true;
}
