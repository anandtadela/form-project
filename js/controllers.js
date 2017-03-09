"use strict";
angular.module('myApp.controllers', []).controller('View1Controller', function($scope, $http, $location) {
    $scope.getClientDetails = function() {
                $http({
                method: 'GET',
                url: 'json/viewdata.json',
                params: {client_number: $scope.clientNumber}
            }).then(function (data){
                var resultData = data.data;
                $location.path("/view2").search({views: resultData});
            },function (error){
                console.log("error");
            });
    }
}).controller('View2Controller', function($scope, $http, $location) {
    // console.log("hi");
    $scope.data1 = $location.search().views;

});
