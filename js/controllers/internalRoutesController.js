angular.module("nativeIP").controller("internalRoutesController", function ($scope, internalRoute, internalRoutes, queues, ivrs, peers, internalRoutesAPI, $location) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;

    if(!internalRoute){
        $scope.internalRoute = new Object;
        $scope.internalRoute.internalRoutesDetails = new Array;
        $scope.internalRoute.internalRoutesDetails.push({mask: "", add: "", remove: "", destinationType: "", destination: ""});
    }

    if(internalRoute){
        $scope.internalRoute = internalRoute.data;
        $scope.internalRoute.internalRoutesDetails = $scope.internalRoute.InternalRoutesDetails;
        delete $scope.internalRoute.InternalRoutesDetails;
        angular.forEach($scope.internalRoute.internalRoutesDetails, function(detail){
            if(detail.destinationType !== 'external'){
                detail.destination = parseInt(detail.destination);
            }
        });
    }

    if(internalRoutes){
        $scope.internalRoutes = internalRoutes.data;

        $scope.deleteInternalRoutes = function (internalRoutes){
            internalRoutes.filter(function (internalRoute){
                if (internalRoute.selected){
                    internalRoutesAPI.deleteInternalRoutes(internalRoute.id).then(function (response){
                        loadInternalRoutes();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadInternalRoutes = function () {
            internalRoutesAPI.getInternalRoutes().then(function (response) {
                $scope.internalRoutes = response.data;
                $scope.checkInternalRouteSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkInternalRouteSelected = function () {
            $scope.hasInternalRouteSelected = $scope.internalRoutes.some(function (internalRoute) {
                return internalRoute.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addInternalRoute = function (internalRoute) {
        internalRoutesAPI.saveInternalRoutes(internalRoute).then(function (response){
            delete $scope.internalRoute;
            $scope.internalRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/internalRoutes");
        });
    };

    $scope.editInternalRoute = function (internalRoute) {
        internalRoutesAPI.updateInternalRoute(internalRoute.id, internalRoute).then(function (response){
            delete $scope.internalRoute;
            $scope.internalRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/internalRoutes");
        });
    };

    $scope.addDetail = function (detail){
        var newDetail = {mask: "", add: "", remove: "", destinationType: "", destination: ""};
        $scope.internalRoute.internalRoutesDetails.splice(($scope.internalRoute.internalRoutesDetails.indexOf(detail)+1),0, newDetail);
    }

    $scope.removeDetail = function (detail) {
        $scope.internalRoute.internalRoutesDetails.splice( $scope.internalRoute.internalRoutesDetails.indexOf(detail), 1 );
    }

    $scope.emptyDestination = function (detail){
        detail.destination = "";
    }

});