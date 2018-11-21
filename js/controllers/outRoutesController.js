angular.module("nativeIP").controller("outRoutesController", function ($scope, outRoute, outRoutes, queues, ivrs, peers, outRoutesAPI, trunks, $location) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;
    $scope.trunks = trunks.data;

    if(!outRoute){
        $scope.outRoute = new Object;
        $scope.outRoute.outRoutesDetails = new Array;
        $scope.outRoute.outRoutesDetails.push({mask: "", add: "", remove: "", destinationType: "", destination: "", enabled: true});
    }

    if(outRoute){
        $scope.outRoute = outRoute.data;
        $scope.outRoute.outRoutesDetails = $scope.outRoute.OutRouteDetails;
        delete $scope.outRoute.OutRouteDetails;
        angular.forEach($scope.outRoute.outRoutesDetails, function(detail){
            detail.overflows = detail.OutRouteOverflows;
            delete detail.OutRouteOverflows;
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

    $scope.addOverflowDetail = function (detail, overflowDetail){
        var newDetail = {busy: false, fail: false, trunkLimit: false, trunkId: ""};
        detail.overflows.splice((detail.overflows.indexOf(overflowDetail)+1),0, newDetail);
    }

    $scope.removeOverflowDetail = function (detail, overflowDetail) {
        detail.overflows.splice( detail.overflows.indexOf(overflowDetail), 1 );
    }

    $scope.createOverflow = function (detail){
        if(!detail.overflows){
            var overflow = new Array;
            overflow.push({busy: false, fail: false, trunkLimit: false, trunkId: ""});
            detail.overflows = overflow;
        }
    }

    $scope.removeOverflow = function (detail){
        detail.overflows = detail.overflows.filter(function(value){
            return value.trunkId;
        });
        if(!detail.overflows.length){
            delete detail.overflows;
        }
    }
});