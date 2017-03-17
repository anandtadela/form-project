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
                 myService.set(d.data);
                 $location.path("/view2")
             });
             
        } else {
            $scope.showErrorMsg = true;
            return;
        }
               
    }
}).controller('View2Controller', function($scope, $http, $location,myService, $uibModal) {
    $scope.data1 = myService.getData();
        var $ctrl = this;
        $ctrl.animationsEnabled = true;
        $ctrl.open = function (val,modalTitle) {
            $ctrl.val = val;
            $ctrl.modalTitle = modalTitle;
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
                    },
                    modalTitle: function() {
                        return $ctrl.modalTitle;
                    }
                }
            });
        };
    
}).controller('FormController', function($scope, myService, $location) {
   $scope.contents = [
    {
        id: 'application/json',
        name: 'Application'
    },
    {
        id: 'application/xml',
        name: 'XML'
    }
    ];
    $scope.SubmitForm = function () {
        $scope.errorMsg = "Enter mandatory fields";
        var requestObj = {
            clientName:$scope.clientName,
            request:$scope.request,
            response:$scope.response,
            contentTtype:$scope.contentsType

        };

        if(!!$scope.clientName && !!$scope.request && !!$scope.response) {
            // Call the async method and then do stuff with what is returned inside our own then function
             myService.saveRequestDetails(requestObj).then(function(d) {
                 resetForm();
                 d.data.errorList.length === 0 ? $scope.showSuccessMsg = true : $scope.showErrorMsg = true;
                 (d.data.errorList.length > 0 ) ? $scope.errorMsg = d.errorList[0].errorMessage : $scope.errorMsg = "";
             });
        } else {
            $scope.showErrorMsg = true;
            return;
        }

    };
     function resetForm() {
        $scope.clientName =""; $scope.request = ""; $scope.response = "";
    }
}).controller('NavController', function($scope, myService, $location) {
    $scope.getActiveClass = function(path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    };
     $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

angular.module('ui.bootstrap').controller('ModalInstanceCtrl', function ($uibModalInstance, val, modalTitle) {
  var $ctrl = this;
  $ctrl.val = val;
  $ctrl.modalTitle = modalTitle;
  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
