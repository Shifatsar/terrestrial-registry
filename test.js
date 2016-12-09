angular.module('TourOfHeroes', []).controller('SpecialOrderItemsCtrl', ['$scope', 'articleDataService',  function($scope, articleDataService){
  // when promise is resolved, set the scope variable
  articleDataService.getArticles().then(function(articles){
      // store any data from json that you want on the scope for later access in your templates
      $scope.articles = articles.data;
      $scope.custInfo=articles.data.customer;
  })
}]).factory('articleDataService',['$http', '$q', function($http, $q){
  var data = null;
  return {
    getArticles: function() {
      var promise;
      if(data === null) {
        promise = $http.get('articleData.json').then(function(response){
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