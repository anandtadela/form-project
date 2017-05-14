"use strict";
angular.module('myApp',[
'ngRoute',
'myApp.controllers',
'ui.bootstrap'
]).config(function($routeProvider, $locationProvider){
    $routeProvider.when('/home',{
    templateUrl:'/partials/home.html'
    }).when('/view2',{
    templateUrl:'/partials/view2.html',
    reloadOnSearch: false 
    }).when('/submitform',{
    templateUrl:'/partials/submitform.html',
    reloadOnSearch: false 
    }).otherwise({redirectTo:'/home'});
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});