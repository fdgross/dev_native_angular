angular.module("nativeIP").controller("groupsController", function ($scope, group, groups, groupsAPI, $location, peers) {

    if(group){
        $scope.group = group.data;
        $scope.peers = new Array;
        angular.forEach(peers.data, function(peer){
            angular.forEach(peer.Groups, function(peerGroup){
                if(peerGroup.id === $scope.group.id){
                    $scope.peers.push({"id": peer.id, "username": peer.username, "name": peer.name});
                }
            });
        });
    }

    if(groups){
        $scope.groups = groups.data;

        $scope.deleteGroups = function (groups){
            groups.filter(function (group){
                if (group.selected){
                    groupsAPI.deleteGroups(group.id).then(function (response){
                        loadGroups();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadGroups = function () {
            groupsAPI.getGroups().then(function (response) {
                $scope.groups = response.data;
                $scope.checkGroupSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkGroupSelected = function () {
            $scope.hasGroupSelected = $scope.groups.some(function (group) {
                return group.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addGroup = function (group) {
        groupsAPI.saveGroups(group).then(function (response){
            delete $scope.group;
            $scope.groupForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/groups");
        });
    };

    $scope.editGroup = function (group) {
        groupsAPI.updateGroup(group.id, group).then(function (response){
            delete $scope.group;
            $scope.groupForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/groups");
        });
    };
});