var app = angular.module("myApp");
app.factory('myService', function( $http) {
 var savedData = {}, promise;
 function set(data) {
   savedData = data;
 }
 function getViewServiceCall(clientName) {
        // $http returns a promise, which has a then function, which also returns a promise
        if ( !promise ) {
          promise = $http({
              method: 'GET',
              url: 'http://10.8.94.49:8888/getmockdatalist',
              params: {clientName: clientName}
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

 function saveRequestDetails(requestObj) {
     
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http({
            method: 'POST',
            url: 'http://10.8.94.49:8888/savemockdata',
            data: {request: requestObj.request, response:requestObj.response, contenttype:requestObj.contentTtype, client:requestObj.clientName}
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
  getViewServiceCall: getViewServiceCall,
  saveRequestDetails:saveRequestDetails
 }

});