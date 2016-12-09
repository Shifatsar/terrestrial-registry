var app = angular.module('TourOfHeroes', ["ngRoute"]);

//-------------routes
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

	.otherwise("/home"); //---------change to home once json is fixed
}]);

//--------------aliens controller
app.controller('AliensController', ['$scope', '$location', 'alienDataService', function($scope, $location, alienDataService){
	
	$scope.go = function (path) {
     $location.path(path);
    };
	
  alienDataService.getAliens().then(function(aliens){
      $scope.aliens = aliens.data.aliens;


  })
}]);


app.controller('AliensEditController', ['$scope', 'alienDataService',  function($scope, alienDataService, $routeParams){
  alienDataService.getAliens().then(function(aliens){
      $scope.alien = aliens.data.aliens.get($routeParams);;
     //$rootScope.title = "Edit " + ctrl.person.name;

  })
}]);


// ---- angular factory and promise code borrowed from: http://plnkr.co/edit/7Oas2T
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





//====with other crap
// app.controller('AliensController', ['$scope', 'alienDataService',  function($scope, alienDataService){
//   // when promise is resolved, set the scope variable
//   alienDataService.getAliens().then(function(aliens){
//       // store any data from json that you want on the scope for later access in your templates
//       $scope.aliens = aliens.data.aliens;
//       //$scope.custInfo=articles.data.customer;
//       // var ctrl =this;
//       // ctrl.allAliens = aliens;

//   })
// }]);

//===============useless or might reuse code=======================
// app.factory('aliens', function($http){
// 	 return {
//           list: function(callback){
//             $http.get('data.json').success(callback);
//           }
//         };       
// });

// app.service('AlienCtrl', function($scope, $http) {
//   $http.get("data.json").then(function (response) {
//       $scope.myData = response.data.aliens;
//   });
// });

// app.service("myProvider", function() { // CHANGED "factory" to "service"
//     // NOTE that the only function being passed is the object constructor from before
//     this.getValue = function() {
//         return "My Value";
//     };
// });


// app.controller("MyController", function(myProvider) {
//     console.log("MyController - myProvider: " + myProvider.getValue()); // CHANGED to call getValue()
// });

// app.service('customersService', function($http, $log) {

// this.getCustomers = function() {
//     $http({
//         method : 'POST',
//         url : 'data.json'
//     }).success(function(data, status, headers, config) {
//         $log.log('Done');
//         angular.forEach(data, function(c) {
//             $log.log(c.firstName);
//         });
//         customers = data;
//         return customers;
//     });     
// };
// });