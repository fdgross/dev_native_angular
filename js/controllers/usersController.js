angular.module("nativeIP").controller("usersController", function ($scope, user, users, permissions, costCenters, peers, usersAPI, $location, $filter) {

    $scope.permissions = permissions.data;
    $scope.costCenters = costCenters.data;
    $scope.users = users.data;
    $scope.peers = peers.data;
    
    $scope.avatars = Array();
    for(i = 1; i <= 50; i++){
        $scope.avatars.push(i+"-call-center.png");
    }
        
    angular.forEach($scope.permissions, function(permission){
        switch(permission.name){
            case 'contacts':
                permission.displayName = "Agenda Pública";
                break;
            case 'customRules':
                permission.displayName = "Regras Customizadas";
                break;
            case 'features':
                permission.displayName = "Funcionalidades";
                break;
            case 'routes':
                permission.displayName = "Plano de Discagem";
                break;
            case 'ivrs':
                permission.displayName = "URAs";
                break;
            case 'meetmes':
                permission.displayName = "Conferências";
                break;
            case 'peers':
                permission.displayName = "Ramais";
                break;
            case 'queues':
                permission.displayName = "Filas";
                break;
            case 'serviceHours':
                permission.displayName = "Horários de Atendimento";
                break;
            case 'trunks':
                permission.displayName = "Troncos";
                break;
            case 'users':
                permission.displayName = "Usuários";
                break;
            case 'reports':
                permission.displayName = "Relatórios";
                break;
            case 'mohs':
                permission.displayName = "Música de Espera";
                break;
            case 'apis':
                permission.displayName = "APIs";
                break;
            case 'cockpit':
                permission.displayName = "Cockpit";
                break;
        }
    });

    if(user){
        $scope.user = user.data;

        if($scope.user.Permissions){
            angular.forEach($scope.user.Permissions, function(permission){
                var objPermission = $filter('filter')($scope.permissions, {id: permission.id}, true)[0];
                objPermission.checked = true;
                if(permission.name === "reports"){
                    $scope.reportsSelected = true;
                }
            });
        }

        if($scope.user.CostCenters){
            angular.forEach($scope.user.CostCenters, function(costCenter){
                var objCostCenter = $filter('filter')($scope.costCenters, {id: costCenter.id}, true)[0];
                objCostCenter.checked = true;
            });
        }
    }

    //REMOVE do array de peers os que já estiverem associados a um usuário
    if($scope.peers){
        var arrPeers = $scope.peers;
        angular.forEach($scope.users, function(loopUser){
            if(loopUser.peerId){
                var peer = $filter('filter')(arrPeers, {id: loopUser.peerId}, true)[0];
                if((peer) && ((($scope.user) && (peer.id != $scope.user.peerId)) || (!$scope.user))){
                    arrPeers.splice(arrPeers.indexOf(peer), 1);
                }
            }
        });
    }

    if(users){
        $scope.deleteUsers = function (users){
            users.filter(function (user){
                if (user.selected){
                    usersAPI.deleteUsers(user.id).then(function (response){
                        loadUsers();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadUsers = function () {
            usersAPI.getUsers().then(function (response) {
                $scope.users = response.data;
                $scope.checkUserSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkUserSelected = function () {
            $scope.hasUserSelected = $scope.users.some(function (user) {
                return user.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.toggleAvatar = function (avatar) {
        if($scope.user.avatar != avatar){
            $scope.user.avatar = avatar;
        }
        else{
            $scope.user.avatar = "";
        }
    };

    $scope.checkReportsSelected = function (permission) {
        if (permission.name === 'reports'){
            $scope.reportsSelected = permission.checked;
        }
    };

    $scope.addUser = function (user) {
        
        user = setPermissionsCostCenter(user);

        console.log(user);

        usersAPI.saveUsers(user).then(function (response){
            delete $scope.user;
            $scope.userForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/users");
        });
    };

    $scope.editUser = function (user) {

        user = setPermissionsCostCenter(user);

        if(user.peerId === ''){
            user.peerId = null;
        }

        usersAPI.updateUser(user.id, user).then(function (response){
            delete $scope.user;
            $scope.userForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/users");
        });
    };

    var setPermissionsCostCenter = function (user) {
        user.permissions = [];
        angular.forEach($scope.permissions, function(permission, index) {
            if((permission.checked) && 
                ((permission.name !== 'cockpit') || ((user.peerId) && (permission.name === 'cockpit')))) {
                user.permissions.push(permission.id);
            }
            if (permission.name === 'reports'){
                user.costCenters = [];
                angular.forEach($scope.costCenters, function(costCenter, index) {
                    if(costCenter.checked) {
                        user.costCenters.push(costCenter.id);
                    }
                });
            }
        });
        return user;
    };
});