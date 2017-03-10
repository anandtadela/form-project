var app = angular.module("myApp");
app.factory('myService', function( $http) {
 var savedData = {}, promise;
 function set(data) {
   savedData = data;
 }
 function getViewServiceCall(clientName) {
     
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http({
            method: 'GET',
            url: 'json/viewdata.json',
            params: {client_name: clientName}
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

 
 function getData() {
    return savedData;
 }

 return {
  set: set,
  getData: getData,
  getViewServiceCall: getViewServiceCall
 }

});