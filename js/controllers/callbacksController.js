angular.module("nativeIP").controller("callbacksController", function ($scope, callback, callbacks, profiles, peers, ivrs, queues, callbacksAPI, $location, $filter) {

    $scope.profiles = profiles.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;
    $scope.queues = queues.data;

    if(callback){
        $scope.callback = callback.data;
        $scope.callback.destination = parseInt($scope.callback.destination);
    }

    if(callbacks){
        $scope.callbacks = callbacks.data;

        angular.forEach($scope.callbacks, function(callback) {
            var destinationId = parseInt(callback.destination);
            switch (callback.destinationType) {
                case 'peer':
                    callback.destinationTypeName = 'Ramal';
                    var peer = $filter('filter')($scope.peers, {id: destinationId}, true)[0];
                    callback.destinationName = peer.username+" - "+peer.name;
                    break;
                case 'queue':
                    callback.destinationTypeName = 'Fila';
                    var queue = $filter('filter')($scope.queues, {id: destinationId}, true)[0];
                    callback.destinationName = queue.name;
                    break;
                case 'ivr':
                    callback.destinationTypeName = 'URA';
                    var ivr = $filter('filter')($scope.ivrs, {id: destinationId}, true)[0];
                    callback.destinationName = ivr.name;
                    break;
            }
        });

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

    $scope.emptyDestination = function (callback) {
        delete callback.destination;
    }
});