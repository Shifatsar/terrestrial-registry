angular.module('TourOfHeroes').controller('AliensController', ['$scope', 'alienDataService', '$location',  function($scope, alienDataService, $location){
  alienDataService.getAliens().then(function(aliens){
      $scope.aliens = aliens.data.aliens;

      $scope.goToDashboard = function () {
     $location.path('/home');
    };
  })
}]);