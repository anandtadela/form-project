"use strict";
angular.module('myApp.controllers', []).controller('View1Controller', function($scope, $http, $location,myService) {
    $scope.getClientDetails = function() {
                $http({
                method: 'GET',
                url: 'json/viewdata.json',
                params: {client_number: $scope.clientNumber}
            }).then(function (data){
                var resultData = data.data;
                myService.set(resultData);
                $location.path("/view2");
            },function (error){
                console.log("error");
            });
    }
}).controller('View2Controller', function($scope, $http, $location,myService) {
    $scope.data1 = myService.get();
});
