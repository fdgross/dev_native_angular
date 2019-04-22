angular.module("nativeIP").controller("costCentersController", function ($scope, costCenter, costCenters, costCentersAPI, $location, peers) {

    if(costCenter){
        $scope.costCenter = costCenter.data;
        $scope.peers = [];
        angular.forEach(peers.data, function(peer){
            if(peer.costCenterId === $scope.costCenter.id){
                $scope.peers.push({"id": peer.id, "username": peer.username, "name": peer.name});
            }
        });
    }

    if(costCenters){
        $scope.costCenters = costCenters.data;

        $scope.deleteCostCenters = function (costCenters){
            costCenters.filter(function (costCenter){
                if (costCenter.selected){
                    costCentersAPI.deleteCostCenters(costCenter.id).then(function (response){
                        loadCostCenters();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadCostCenters = function () {
            costCentersAPI.getCostCenters().then(function (response) {
                $scope.costCenters = response.data;
                $scope.checkCostCenterSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkCostCenterSelected = function () {
            $scope.hasCostCenterSelected = $scope.costCenters.some(function (costCenter) {
                return costCenter.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addCostCenter = function (costCenter) {
        costCentersAPI.saveCostCenters(costCenter).then(function (response){
            delete $scope.costCenter;
            $scope.costCenterForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/costCenters");
        });
    };

    $scope.editCostCenter = function (costCenter) {
        costCentersAPI.updateCostCenter(costCenter.id, costCenter).then(function (response){
            delete $scope.costCenter;
            $scope.costCenterForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/costCenters");
        });
    };
});