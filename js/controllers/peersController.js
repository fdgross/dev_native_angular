angular.module("nativeIP").controller("peersController", function ($scope, $rootScope, peer, peers, peersAPI, $location, categories, groups, profiles, costCenters, $filter, $window) {
    $scope.categories = categories.data;
    $scope.groups = groups.data;
    $scope.profiles = profiles.data;
    $scope.costCenters = costCenters.data;

    /**
     * EDIT PEER
     */
    if(peer){
        $scope.peer = peer.data;
    
        if($scope.peer.Groups){
            angular.forEach($scope.peer.Groups, function(group){
                var objGroup = $filter('filter')($scope.groups, {id: group.id}, true)[0];
                objGroup.checked = true;
            });
        }
    
        if($scope.peer.categoryId){
            $scope.peer.category = $scope.peer.Category;
        }

        if($scope.peer.costCenterId){
            $scope.peer.costCenter = $scope.peer.costCenter;
        }

        $scope.editPeer = function (peer) {
            peer = setGroupsCategoryCostCenter(peer);
    
            peersAPI.updatePeer(peer.id, peer).then(function (response){
                delete $scope.peer;
                $scope.peerForm.$setPristine();
            }, function (error){
                console.log(error);
            }).then(function (response) {
                $location.path("/peers");
            });
        };
    }

    /**
     * LIST PEERS
     */
    if(peers){
        $scope.peers = peers.data;
    
        $scope.deletePeers = function (peers){
            peers.filter(function (peer){
                if (peer.selected){
                    peersAPI.deletePeers(peer.id).then(function (){
                        loadPeers();
                    });
                };
            });
        };

        var loadPeers = function () {
            peersAPI.getPeers().then(function (response) {
                $scope.peers = response.data;
                $scope.checkPeerSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkPeerSelected = function () {
            $scope.hasPeerSelected = $scope.peers.some(function (peer) {
                return peer.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    /**
     * NEW PEER
     */
    $scope.addPeer = function (peer) {
        peer = setGroupsCategoryCostCenter(peer);
        
        peersAPI.savePeers(peer).then(function (response){
            delete $scope.peer;
            $scope.peerForm.$setPristine();
            $location.path("/peers");
        }, function (error){
            $scope.returnStatus = error.status;
        });
    };

    var setGroupsCategoryCostCenter = function (peer) {
        if(peer.category){
            peer.categoryId = peer.category.id;
            delete peer.category;
        }
        if(peer.costCenter){
            peer.costCenterId = peer.costCenter.id;
            delete peer.costCenter;
        }
        peer.groups = new Array;
        angular.forEach($scope.groups, function(group, index) {
            if(group.checked) {
                peer.groups.push(group.id);
            }
        });
        return peer;
    }
});