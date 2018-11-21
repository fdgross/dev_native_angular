angular.module("nativeIP").controller("callbacksController", function ($scope, callback, callbacks, profiles, callbacksAPI, $location) {

    $scope.profiles = profiles.data;

    if(callback){
        $scope.callback = callback.data;
    }

    if(callbacks){
        $scope.callbacks = callbacks.data;

        $scope.deleteCallbacks = function (callbacks){
            callbacks.filter(function (callback){
                if (callback.selected){
                    callbacksAPI.deleteCallbacks(callback.id).then(function (response){
                        loadCallbacks();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadCallbacks = function () {
            callbacksAPI.getCallbacks().then(function (response) {
                $scope.callbacks = response.data;
                $scope.checkCallbackSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkCallbackSelected = function () {
            $scope.hasCallbackSelected = $scope.callbacks.some(function (callback) {
                return callback.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addCallback = function (callback) {
        callbacksAPI.saveCallbacks(callback).then(function (response){
            delete $scope.callback;
            $scope.callbackForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/callbacks");
        });
    };

    $scope.editCallback = function (callback) {
        callbacksAPI.updateCallback(callback.id, callback).then(function (response){
            delete $scope.callback;
            $scope.callbackForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/callbacks");
        });
    };
});