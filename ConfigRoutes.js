angular.module('TourOfHeroes').config(['$routeProvider', function (rp) {
	rp.when("/home", {
		templateUrl : "Partials/home.html",
		controller : "HomeController as ctrl"

	})
	.when("/aliens",{
		templateUrl : "Partials/aliens.html",
		controller : "AliensController as ctrl"	

	})
	.when("/aliens/:name/edit",{
		templateUrl : "Partials/edit.html",
		controller : "AliensEditController as ctrl"
	})

	.otherwise("/home"); //---------change to home once json is fixed
}]);
