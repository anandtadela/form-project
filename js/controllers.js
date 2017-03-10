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
}).controller('View2Controller', function($scope, $http, $location,myService, $uibModal) {
    $scope.data1 = myService.getData();
    $scope.backToHome = function() {
        $location.path("/view1");
    }
   
        var $ctrl = this;
        $ctrl.animationsEnabled = true;
        // $ctrl.val = "";
        $ctrl.open = function (val) {
            $ctrl.val = val;
            var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modal-window.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            resolve: {
                    val: function () {
                    return $ctrl.val;
                    }
                }
            });
        };
    
});

angular.module('ui.bootstrap').controller('ModalInstanceCtrl', function ($uibModalInstance, val) {
  var $ctrl = this;
  $ctrl.val = val;
  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
