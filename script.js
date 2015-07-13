var mealgameApp = angular.module("mealgameApp", []);
mealgameApp.controller("GameCtrl", ["$scope", "$filter", "restaurantsService", function ($scope, $filter, restaurantsService) {
  $scope.guess = "No guess yet!";
  $scope.preferences = {};
  $scope.restaurants = restaurantsService;
  $scope.score = function(preferences, restaurant) {
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
  $scope.makeGuess = function() {
    var mappedOptions = $scope.restaurants.map(function(restaurant) {
      return {
        name: restaurant.name,
        score: $scope.score($scope.preferences, restaurant.characteristics)
      };
    });
    var rankedOptions = $filter('orderBy')(mappedOptions, function(restaurant) {
      return restaurant.score;
    });
    return rankedOptions[0];
  };
  $scope.change = function() {
    var guess = $scope.makeGuess();
    $scope.guess = guess.name;
  };
  $scope.getCharacteristicsList = function getCharacteristicsList(restaurants) {
    return $scope.restaurants
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
}]);
