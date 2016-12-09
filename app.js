var app = angular.module('TourOfHeroes', ["ngRoute"]);

app.config(['$routeProvider', function (rp) {
	rp.when("/home", {
		templateUrl : "Partials/home.html",
		controller : "HomeController as ctrl"
	})
	.when("/people",{
		templateUrl : "Partials/people.html",
		controller : "PeopleController as ctrl"	
	})
	.when("/people/:id/edit",{
		templateUrl : "Partials/edit.html"
,		controller : "PeopleEditController as ctrl"
	})

	.otherwise("/home");
}]);

app.controller('HomeController', function ($rootScope, people) {
	var ctrl = this;
	$rootScope.title = "Home";
	ctrl.topPeople = people.topPeople();

});
app.controller('PeopleController', function ($rootScope, people) {
	var ctrl = this;
	$rootScope.title = "All People";
	ctrl.allPeople = people.allPeople();

	// ctrl.list = list.aliens;
	// //console.log("aliens.name");

});
app.controller('PeopleEditController', function ($rootScope, people, $routeParams) {
	var ctrl = this;
	ctrl.person = people.get($routeParams.id);
	$rootScope.title = "Edit " + ctrl.person.name;
});

app.service('people', function ($filter) {

	var people = [
		{
			id : 1,
			name : 'Superman'
		},
		{
			id : 2,
			name : 'Batman'
		},
		{
			id : 3,
			name : 'Spiderman'
		},
		{
			id : 4,
			name : 'WonderWoman'
		}
	];	
	return {
		add: function (person) {
			people.push(person);
		},

		get: function (id) {
			id = parseInt(id);
			var person = $filter('filter')(people, {id:id}, true);

			if (person.length){
				person = person[0];
			}else{
				person = {};
			}
			return person;
		},

		allPeople : function () {
			return people;
		},

		topPeople : function () {
			return people.slice(0, 3);
		}

	}


});



app.controller('SpecialOrderItemsCtrl', ['$scope', 'alienDataService',  function($scope, alienDataService){
  // when promise is resolved, set the scope variable
  alienDataService.getAliens().then(function(aliens){
      // store any data from json that you want on the scope for later access in your templates
      $scope.aliens = aliens.data.aliens[0].name;
      //$scope.custInfo=articles.data.customer;
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