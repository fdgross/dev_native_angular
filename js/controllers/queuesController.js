angular.module("nativeIP").controller("queuesController", function ($scope, queue, queues, peers, users, mohs, ivrs, queuesAPI, $location, $filter) {

    $scope.users = users.data;
    $scope.peers = peers.data;
    $scope.mohs = mohs.data;
    $scope.ivrs = [];
    angular.forEach(ivrs.data, function(ivr){
        if(ivr.type === 'customRule'){
            $scope.ivrs.push(ivr);
        }
    });

    $scope.modelPeers = {
        selected: null,
        allowedTypes: ['agents'],
        type: 'agents',
        lists: {"peersAvail": $scope.peers, "peersSelected": []}
    };

    $scope.modelUsers = {
        selected: null,
        allowedTypes: ['agents'],
        type: 'agents',
        lists: {"usersAvail": $scope.users, "usersSelected": []}
    };

    $scope.modelIvrs = {
        selected: null,
        allowedTypes: ['customRule'],
        lists: {"ivrsAvail": $scope.ivrs, "ivrsSelectedBefore": [], "ivrsSelectedAfter": []}
    };

    if(queue){
        $scope.queue = queue.data;

        if($scope.queue.queueTimeout > 0){
            $scope.queue.chkQueueTimeout = true;
        }

        if($scope.queue.queueMaxSize > 0){
            $scope.queue.chkQueueMaxSize = true;
        }

        if($scope.queue.Users){
            angular.forEach($scope.queue.Users, function(user){
                var objUser = $filter('filter')($scope.users, {id: user.id}, true)[0];
                $scope.modelUsers.lists.usersSelected.push(objUser);
                $scope.modelUsers.lists.usersAvail = $scope.modelUsers.lists.usersAvail.filter(function(el){
                    return el !== objUser;
                });
            });
        }

        if($scope.queue.Peers){
            angular.forEach($scope.queue.Peers, function(peer){
                var objPeer = $filter('filter')($scope.peers, {id: peer.id}, true)[0];
                $scope.modelPeers.lists.peersSelected.push(objPeer);
                $scope.modelPeers.lists.peersAvail = $scope.modelPeers.lists.peersAvail.filter(function(el){
                    return el !== objPeer;
                });
            });
        }

        if($scope.queue.CustomRulesBefore){
            angular.forEach($scope.queue.CustomRulesBefore, function(rule){
                var objRule = $filter('filter')($scope.ivrs, {id: rule.id}, true)[0];
                $scope.modelIvrs.lists.ivrsSelectedBefore.push(objRule);
                $scope.modelIvrs.lists.ivrsAvail = $scope.modelIvrs.lists.ivrsAvail.filter(function(el){
                    return el !== objRule;
                });
            });
        }

        if($scope.queue.CustomRulesAfter){
            angular.forEach($scope.queue.CustomRulesAfter, function(rule){
                var objRule = $filter('filter')($scope.ivrs, {id: rule.id}, true)[0];
                $scope.modelIvrs.lists.ivrsSelectedAfter.push(objRule);
                $scope.modelIvrs.lists.ivrsAvail = $scope.modelIvrs.lists.ivrsAvail.filter(function(el){
                    return el !== objRule;
                });
            });
        }
    }

    if(queues){
        $scope.queues = queues.data;

        $scope.deleteQueues = function (queues){
            queues.filter(function (queue){
                if (queue.selected){
                    queuesAPI.deleteQueues(queue.id).then(function (response){
                        loadQueues();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadQueues = function () {
            queuesAPI.getQueues().then(function (response) {
                $scope.queues = response.data;
                $scope.checkQueueSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkQueueSelected = function () {
            $scope.hasQueueSelected = $scope.queues.some(function (queue) {
                return queue.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addQueue = function (queue) {
        
        queue = formatQueue(queue);

        queuesAPI.saveQueues(queue).then(function (response){
            delete $scope.queue;
            $scope.queueForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/queues");
        });
    };

    $scope.editQueue = function (queue) {

        queue = formatQueue(queue);

        queuesAPI.updateQueue(queue.id, queue).then(function (response){
            delete $scope.queue;
            $scope.queueForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/queues");
        });
    };

    var formatQueue = function (queue) {
        if(!queue.chkQueueTimeout){
            queue.queueTimeout = null;
        }
        delete queue.chkQueueTimeout;
        
        if(!queue.chkQueueMaxSize){
            queue.queueMaxSize = null;
        }
        delete queue.chkQueueMaxSize;

        if(queue.callcenter === 'no'){
            queue.peers = [];
            queue.users = [];
            angular.forEach($scope.modelPeers.lists.peersSelected, function(peer, index) {
                queue.peers.push(peer.id);
            });
        }
        else{
            queue.users = [];
            queue.peers = [];
            angular.forEach($scope.modelUsers.lists.usersSelected, function(user, index) {
                queue.users.push(user.id);
            });
        }

        queue.customRulesBefore = [];
        angular.forEach($scope.modelIvrs.lists.ivrsSelectedBefore, function(ivr, index) {
            queue.customRulesBefore.push(ivr.id);
        });

        queue.customRulesAfter = [];
        angular.forEach($scope.modelIvrs.lists.ivrsSelectedAfter, function(ivr, index) {
            queue.customRulesAfter.push(ivr.id);
        });

        return queue;
    };
});