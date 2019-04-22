angular.module("nativeIP").controller("trunksController", function ($scope, trunk, trunks, trunksAPI, $location) {

    $scope.khompBoards = [
        {id: 0, 
            fxo: [
                {id: "B0C0", checked: false},
                {id: "B0C1", checked: false},
                {id: "B0C2", checked: false},
                {id: "B0C3", checked: false}
            ], 
            gsm: [
                {id: "B0C4", checked: false},
                {id: "B0C5", checked: false},
                {id: "B0C6", checked: false},
                {id: "B0C7", checked: false}
            ]
        },
        {id: 1, 
            links: [
                {id: "B1L0", checked: false},
                {id: "B1L1", checked: false}
            ], 
            fxo: [
                {id: "B1C60", checked: false},
                {id: "B1C61", checked: false},
                {id: "B1C62", checked: false},
                {id: "B1C63", checked: false}
            ], 
            gsm: [
                {id: "B1C64", checked: false},
                {id: "B1C65", checked: false}
            ]
        }
    ];

    if(trunk){
        $scope.trunk = trunk.data;
        if($scope.trunk.type === 'KHOMP'){
            $scope.trunk.channels = $scope.trunk.channels.split(",");
            angular.forEach($scope.khompBoards, function(board){
                if(board.links){
                    angular.forEach(board.links, function(link){
                        if($scope.trunk.channels.indexOf(link.id) >= 0){
                            link.checked = true;
                        }
                    });
                }
                if(board.fxo){
                    angular.forEach(board.fxo, function(fxoChannel){
                        if($scope.trunk.channels.indexOf(fxoChannel.id) >= 0){
                            fxoChannel.checked = true;
                        }
                    });
                }
                if(board.gsm){
                    angular.forEach(board.gsm, function(gsmChannel){
                        if($scope.trunk.channels.indexOf(gsmChannel.id) >= 0){
                            gsmChannel.checked = true;
                        }
                    });
                }
            });
        }
    }

    if(trunks){
        $scope.trunks = trunks.data;

        $scope.deleteTrunks = function (trunks){
            trunks.filter(function (trunk){
                if (trunk.selected){
                    trunksAPI.deleteTrunks(trunk.id).then(function (response){
                        loadTrunks();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadTrunks = function () {
            trunksAPI.getTrunks().then(function (response) {
                $scope.trunks = response.data;
                $scope.checkTrunkSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkTrunkSelected = function () {
            $scope.hasTrunkSelected = $scope.trunks.some(function (trunk) {
                return trunk.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addTrunk = function (trunk) {
        if(trunk.type === 'KHOMP'){
            trunk.channels = trunk.channels.toString();
        }

        trunksAPI.saveTrunks(trunk).then(function (response){
            delete $scope.trunk;
            $scope.trunkForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/trunks");
        });
    };

    $scope.editTrunk = function (trunk) {
        if(trunk.type === 'KHOMP'){
            trunk.channels = trunk.channels.toString();
        }

        trunksAPI.updateTrunk(trunk.id, trunk).then(function (response){
            delete $scope.trunk;
            $scope.trunkForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/trunks");
        });
    };

    $scope.addRemoveChannel = function(channel, check){
        if(!$scope.trunk.channels){
            $scope.trunk.channels = [];
        }
        if(check){
            $scope.trunk.channels.push(channel);
        }
        else{
            $scope.trunk.channels.splice($scope.trunk.channels.indexOf(channel),1);
        }
    };
});