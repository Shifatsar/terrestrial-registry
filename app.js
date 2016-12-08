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
		templateUrl : "Partials/edit.html",
		controller : "PeopleEditController as ctrl"
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