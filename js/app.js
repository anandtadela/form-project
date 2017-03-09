"use strict";
angular.module('myApp',[
'ngRoute',
'myApp.controllers',
'myApp.services'
]).config(function($routeProvider, $locationProvider){
    $routeProvider.when('/view1',{
    controller:'View1Controller',
    templateUrl:'/partials/view1.html'
}).when('/view2',{
    templateUrl:'/partials/view2.html',
    reloadOnSearch: false 
    }).otherwise({redirectTo:'/view1'});
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});