var mealgameApp = angular.module("mealgameApp", []);
mealgameApp.controller("GameCtrl", function ($scope) {
  $scope.getCharacteristicsList = function() {
    return [
      "spicy",
      "meaty",
      "wet"
    ];
  };
});
