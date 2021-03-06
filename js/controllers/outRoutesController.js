angular.module("nativeIP").controller("outRoutesController", function ($scope, outRoute, outRoutes, queues, ivrs, peers, outRoutesAPI, trunks, $location) {

    $scope.queues = queues.data;
    $scope.peers = peers.data;
    $scope.ivrs = ivrs.data;
    $scope.trunks = trunks.data;

    if(!outRoute){
        $scope.outRoute = {};
        $scope.outRoute.outRoutesDetails = [];
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
                }
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
    };

    $scope.removeDetail = function (detail) {
        $scope.outRoute.outRoutesDetails.splice( $scope.outRoute.outRoutesDetails.indexOf(detail), 1 );
    };

    $scope.changeMask = function (detail){
        detail.mask = "";
        switch (detail.callType) {
            case 'localLandline':
                detail.mask = "[2-5]XXXXXXX";
                break;
            case 'localMobile':
                detail.mask = "9[4-9]XXXXXXX";
                break;
            case 'longDistanceLandline':
                detail.mask = "0ZZ[2-5]XXXXXXX";
                break;
            case 'longDistanceMobile':
                detail.mask = "0ZZ9[4-9]XXXXXXX";
                break;
            case 'international':
                detail.mask = "00X.";
                break;
            case 'services':
                detail.mask = "1XX";
                break;
            case '0800':
                detail.mask = "0800.";
                break;
        }

    };

    $scope.addOverflowDetail = function (detail, overflowDetail){
        var newDetail = {busy: false, fail: false, trunkLimit: false, trunkId: ""};
        detail.overflows.splice((detail.overflows.indexOf(overflowDetail)+1),0, newDetail);
    };

    $scope.removeOverflowDetail = function (detail, overflowDetail) {
        detail.overflows.splice( detail.overflows.indexOf(overflowDetail), 1 );
    };

    $scope.createOverflow = function (detail){
        if(!detail.overflows){
            var overflow = [];
            overflow.push({busy: false, fail: false, trunkLimit: false, trunkId: ""});
            detail.overflows = overflow;
        }
    };

    $scope.removeOverflow = function (detail){
        detail.overflows = detail.overflows.filter(function(value){
            return value.trunkId;
        });
        if(!detail.overflows.length){
            delete detail.overflows;
        }
    };
});