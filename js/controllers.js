"use strict";
angular.module('myApp.controllers', []).controller('View1Controller', function($scope, $http, $location,myService) {
    $scope.showErrorMsg = false;
    $scope.onClientNameChange =  function(value) {
        $scope.showErrorMsg = !!value ? false:true;
    }
    $scope.getClientDetails = function() {
        if(!!$scope.clientName) {
            // Call the async method and then do stuff with what is returned inside our own then function
             myService.getViewServiceCall($scope.clientName).then(function(d) {
                 myService.set(d);
             });
             $location.path("/view2")
        } else {
            $scope.showErrorMsg = true;
            return;
        }
               
    }
}).controller('View2Controller', function($scope, $http, $location,myService) {
    $scope.data1 = myService.getData();
    $scope.backToHome = function() {
        $location.path("/view1");
    }
});
