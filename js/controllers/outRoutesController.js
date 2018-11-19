angular.module("nativeIP").controller("outRoutesController", function ($scope, outRoute, outRoutes, queues, ivrs, peers, outRoutesAPI, trunks, $location) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;
    $scope.trunks = trunks.data;

    if(!outRoute){
        $scope.outRoute = new Object;
        $scope.outRoute.outRoutesDetails = new Array;
        $scope.outRoute.outRoutesDetails.push({mask: "", add: "", remove: "", destinationType: "", destination: ""});
    }

    if(outRoute){
        $scope.outRoute = outRoute.data;
        $scope.outRoute.outRoutesDetails = $scope.outRoute.OutRoutesDetails;
        delete $scope.outRoute.OutRoutesDetails;
        angular.forEach($scope.outRoute.outRoutesDetails, function(detail){
            if(detail.destinationType !== 'external'){
                detail.destination = parseInt(detail.destination);
            }
        });
    }

    if(outRoutes){
        $scope.outRoutes = outRoutes.data;

        $scope.deleteOutRoutes = function (outRoutes){
            outRoutes.filter(function (outRoute){
                if (outRoute.selected){
                    outRoutesAPI.deleteOutRoutes(outRoute.id).then(function (response){
                        loadOutRoutes();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadOutRoutes = function () {
            outRoutesAPI.getOutRoutes().then(function (response) {
                $scope.outRoutes = response.data;
                $scope.checkOutRouteSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkOutRouteSelected = function () {
            $scope.hasOutRouteSelected = $scope.outRoutes.some(function (outRoute) {
                return outRoute.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addOutRoute = function (outRoute) {
        outRoutesAPI.saveOutRoutes(outRoute).then(function (response){
            delete $scope.outRoute;
            $scope.outRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/outRoutes");
        });
    };

    $scope.editOutRoute = function (outRoute) {
        outRoutesAPI.updateOutRoute(outRoute.id, outRoute).then(function (response){
            delete $scope.outRoute;
            $scope.outRouteForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/outRoutes");
        });
    };

    $scope.addDetail = function (detail){
        var newDetail = {mask: "", add: "", remove: "", destinationType: "", destination: ""};
        $scope.outRoute.outRoutesDetails.splice(($scope.outRoute.outRoutesDetails.indexOf(detail)+1),0, newDetail);
    }

    $scope.removeDetail = function (detail) {
        $scope.outRoute.outRoutesDetails.splice( $scope.outRoute.outRoutesDetails.indexOf(detail), 1 );
    }

    $scope.emptyDestination = function (detail){
        detail.destination = "";
    }

});