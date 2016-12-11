var app = angular.module('TourOfHeroes', ["ngRoute"]);


//=====   ROUTES   =====//
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl : "Partials/home.html",
		controller : "HomeController"

	})
	.when("/aliens",{
		templateUrl : "Partials/aliens.html",
		controller : "AliensController"	

	})
	.when("/aliens/:name/edit",{
		templateUrl : "Partials/edit.html",
		controller : "AliensEditController"
	})

	.otherwise("/home");
}]);


//=====   HOME CONTROLLER   =====//
app.controller('HomeController', ['$scope', '$location', 'alienDataService', function($scope, $location, alienDataService){
    alienDataService.getAliens().then(function(aliens){
      $scope.aliens = aliens.data.aliens;
       //$scope.aliens.splice(0,3);
  })
}]);


//=====   ALIENS CONTROLLER   =====//
app.controller('AliensController', ['$scope', '$location', 'alienDataService', function($scope, $location, alienDataService){
	
	$scope.go = function (path) {
     $location.path(path);
    }

    $scope.createAlienUrl = function(alienName){
    	return "aliens/" + alienName + "/edit";
    }
	
	$scope.imgLocation = function(alienName){
    	return "/Images/" + alienName + ".png";
    }	
	
  alienDataService.getAliens().then(function(aliens){
      $scope.aliens = aliens.data.aliens;
  })
}]);

//=====   EDIT CONTROLLER   =====//
app.controller('AliensEditController', ['$scope', 'alienDataService',  function($scope, alienDataService, $routeParams){
	var ctrl = this;
 	alienDataService.getAliens().then(function(aliens){

 	 //edit not working
	 ctrl.alienEdit = aliens.data.aliens.get($routeParams);
	 //--- previous code
	 // $scope.editAlien = aliens.data.aliens.get($routeParams);
     //$rootScope.title = "Edit " + ctrl.person.name;
  })
}]);


// ---- angular factory and promise code borrowed from: http://plnkr.co/edit/7Oas2T
// ---- retrieves data from json file.
app.factory('alienDataService',['$http', '$q', function($http, $q){
  var data = null;
  return {
    getAliens: function() {
      var promise;
      if(data === null) {
        promise = $http.get('data.json').then(function(response){
          // cache the response
          data = response;
          return response;
        });
      } else {
        var deferred = $q.defer();
        // promise is immediately resolved with the cached data
        // this way both cached and async data can be handled consistently
        promise = deferred.promise;
      }
      return promise;
    }

  } ;
}]);