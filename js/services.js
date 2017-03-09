"use strict";
angular.module('myApp.services', []).service('ViewService', function($scope, $http, $location) {
    var promise;
  var myService = {
    async: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http({
                method: 'GET',
                url: 'json/viewdata.json',
                params: {client_number: $scope.clientNumber}
            }).then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
      }
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});