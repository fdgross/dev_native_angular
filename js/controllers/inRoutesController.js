angular.module("nativeIP").controller("inRoutesController", function ($scope, inRoute, inRoutes, queues, ivrs, peers, trunks, internalRoutes, outRoutes, callbacks, inRoutesAPI, $location, $filter) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;
    $scope.trunks = trunks.data;
    $scope.internalRoutes = internalRoutes.data;
    $scope.outRoutes = outRoutes.data;
    $scope.callbacks = callbacks.data;

    if(!inRoute){
        $scope.inRoute = {};
        $scope.inRoute.inRoutesDetails = [];
        $scope.inRoute.inRoutesDetails.push({mask: "", add: "", remove: "", destinationType: "", destination: ""});
    }

    if(inRoute){
        $scope.inRoute = inRoute.data;
        $scope.inRoute.inRoutesDetails = $scope.inRoute.InRouteDetails;
        delete $scope.inRoute.InRoutesDetails;
        angular.forEach($scope.inRoute.inRoutesDetails, function(detail){
            if(detail.destinationType !== 'external'){
                detail.destination = parseInt(detail.destination);
            }
        });
    }

    if(inRoutes){
        $scope.inRoutes = inRoutes.data;

        angular.forEach($scope.inRoutes, function(inRoute) {
            var objTrunk = $filter('filter')($scope.trunks, inRoute.trunkId, true)[0];
            inRoute.trunk = objTrunk.name;
        });

        $scope.deleteInRoutes = function (inRoutes){
            inRoutes.filter(function (inRoute){
                if (inRoute.selected){
                    inRoutesAPI.deleteInRoutes(inRoute.id).then(function (response){
                        loadInRoutes();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadInRoutes = function () {
            inRoutesAPI.getInRoutes().then(function (response) {
                $scope.inRoutes = response.data;
                $scope.checkInRouteSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkInRouteSelected = function () {
            $scope.hasInRouteSelected = $scope.inRoutes.some(function (inRoute) {
                return inRoute.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addInRoute = function (inRoute) {
        inRoutesAPI.saveInRoutes(inRoute).then(function (response){
            delete $scope.inRoute;
            $scope.inRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/inRoutes");
        });
    };

    $scope.editInRoute = function (inRoute) {
        inRoutesAPI.updateInRoute(inRoute.id, inRoute).then(function (response){
            delete $scope.inRoute;
            $scope.inRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/inRoutes");
        });
    };

    $scope.addDetail = function (detail){
        var newDetail = {mask: "", add: "", remove: "", destinationType: "", destination: ""};
        $scope.inRoute.inRoutesDetails.splice(($scope.inRoute.inRoutesDetails.indexOf(detail)+1),0, newDetail);
    };

    $scope.removeDetail = function (detail) {
        $scope.inRoute.inRoutesDetails.splice( $scope.inRoute.inRoutesDetails.indexOf(detail), 1 );
    };

    $scope.emptyDestination = function (detail){
        detail.destination = "";
    };

});