"use strict";
angular.module('myApp.controllers', []).controller('View1Controller', function($scope, $http, $location,myService) {
    $scope.showErrorMsg = false;
    $scope.onClientNameChange =  function(value) {
        $scope.showErrorMsg = !!value ? false:true;
    }
    $scope.getClientDetails = function() {
        if(!!$scope.clientName) {
             $http({
                method: 'GET',
                url: 'json/viewdata.json',
                params: {client_name: $scope.clientName}
            }).then(function (data){
                var resultData = data.data;
                myService.set(resultData);
                $location.path("/view2");
            },function (error){
                console.log("error");
            });
        } else {
            $scope.showErrorMsg = true;
            return;
        }
               
    }
}).controller('View2Controller', function($scope, $http, $location,myService) {
    $scope.data1 = myService.get();
    $scope.backToHome = function() {
        $location.path("/view1");
    }
});
