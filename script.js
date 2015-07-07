var mealgameApp = angular.module("mealgameApp", []);
mealgameApp.controller("GameCtrl", ["$scope", "$filter", function ($scope, $filter) {
  $scope.guess = "No guess yet!";
  $scope.preferences = {};
  $scope.restaurants = [
    {
      name: "Chipotle",
      characteristics: {
        spicy: 6,
        meaty: 6,
        wet: 5
      }
    },
    {
      name: "Chop't",
      characteristics: {
        meaty: 3,
        spicy: 4,
        wet: 7
      }
    },
    {
      name: "Shake Shack",
      characteristics: {
        meaty: 9,
        spicy: 1,
        wet: 6
      }
    },
    {
      name: "Sushi",
      characteristics: {
        meaty: 7,
        spicy: 5,
        wet: 5
      }
    }
    /*
    {
      name: "Iris Cafe",
      characteristics: {
        freshness: 6,
        creativity: 4
      }
    }
    */
  ];
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
