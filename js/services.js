var app = angular.module("myApp");
app.factory('myService', function( $http) {
 var savedData = {}, promise;
 function set(data) {
   savedData = data;
 }
 function getViewServiceCall(clientName) {
        // $http returns a promise, which has a then function, which also returns a promise
        //http://10.8.94.49:8888/getmockdatalist?clientName=foot 
          promise = $http({
              method: 'GET',
              url: 'http://10.8.94.49:8888/getmockdatalist',
              params: {clientName: clientName}
          });
      // Return the promise to the controller
      return promise;
 }

 function saveRequestDetails(requestObj) { 
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http({
            method: 'POST',
            url: 'http://10.8.94.49:8888/savemockdata',
            data: {request: requestObj.request, response:requestObj.response, contenttype:requestObj.contentTtype, client:requestObj.clientName}
        });
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