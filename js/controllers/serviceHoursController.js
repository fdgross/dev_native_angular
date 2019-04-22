angular.module("nativeIP").controller("serviceHoursController", function ($scope, serviceHour, serviceHours, peers, queues, ivrs, serviceHoursAPI, $location, $filter) {

    if(!serviceHours){
        $scope.peers = peers.data;
        $scope.queues = queues.data;
        angular.forEach($scope.queues, function(queue){
            queue.checked = false;
        });
        $scope.ivrs = [];
        $scope.customRules = [];
        angular.forEach(ivrs.data, function(ivr){
            if(ivr.type === 'customRule'){
                $scope.customRules.push({id: ivr.id, name: ivr.name});
            }
            if(ivr.type === 'ivr'){
                $scope.ivrs.push({id: ivr.id, name: ivr.name, checked: false});
            }
        });
    }

    if(!serviceHour){
        $scope.serviceHour = {};
        $scope.serviceHour.serviceHoursDetails = [];
        $scope.serviceHour.serviceHoursDetails.push({startTimeTmp: "", endTimeTmp: "", dowsTmp: [
            {id: "mon", name: "Seg", checked: false},
            {id: "tue", name: "Ter", checked: false},
            {id: "wed", name: "Qua", checked: false},
            {id: "thu", name: "Qui", checked: false},
            {id: "fri", name: "Sex", checked: false},
            {id: "sat", name: "Sab", checked: false},
            {id: "sun", name: "Dom", checked: false},
        ]});
    }

    if(serviceHour){
        var details = serviceHour.data.ServiceHoursDetails;
        delete serviceHour.data.ServiceHoursDetails;
        $scope.serviceHour = serviceHour.data;

        $scope.serviceHour.serviceHoursDetails = [];
        angular.forEach(details, function(detail){
            var arrStart = detail.startTime.split(":");
            var startTime = new Date(Date.UTC(70, 0, 1, arrStart[0], arrStart[1], 0));
            var arrEnd = detail.endTime.split(":");
            var endTime = new Date(Date.UTC(70, 0, 1, arrEnd[0], arrEnd[1], 0));

            detail.dowsTmp = [
                {id: "mon", name: "Seg", checked: false},
                {id: "tue", name: "Ter", checked: false},
                {id: "wed", name: "Qua", checked: false},
                {id: "thu", name: "Qui", checked: false},
                {id: "fri", name: "Sex", checked: false},
                {id: "sat", name: "Sab", checked: false},
                {id: "sun", name: "Dom", checked: false},
            ];

            detail.dows = detail.dows.split(",");

            angular.forEach(detail.dows, function(dowTmp){
                var objDow = $filter('filter')(detail.dowsTmp, dowTmp, true)[0];
                objDow.checked = true;
            });

            $scope.serviceHour.serviceHoursDetails.push({startTimeTmp: startTime, endTimeTmp: endTime, dowsTmp: detail.dowsTmp});
        });

        angular.forEach($scope.serviceHour.Ivrs, function(ivr){
            var objIvr = $filter('filter')($scope.ivrs, ivr.id, true)[0];
            objIvr.checked = true;
        });

        angular.forEach($scope.serviceHour.Queues, function(queue){
            var objQueue = $filter('filter')($scope.queues, queue.id, true)[0];
            objQueue.checked = true;
        });

        if($scope.serviceHour.sendTo !== 'external'){
            $scope.serviceHour.sendToValue = parseInt($scope.serviceHour.sendToValue);
        }
    }

    if(serviceHours){

        $scope.serviceHours = serviceHours.data;

        angular.forEach($scope.serviceHours, function(serviceHour){
            angular.forEach(serviceHour.ServiceHoursDetails, function(detail){
                detail.dows = detail.dows.replace("mon"," Seg");
                detail.dows = detail.dows.replace("tue"," Ter");
                detail.dows = detail.dows.replace("wed"," Qua");
                detail.dows = detail.dows.replace("thu"," Qui");
                detail.dows = detail.dows.replace("fri"," Sex");
                detail.dows = detail.dows.replace("sat"," Sab");
                detail.dows = detail.dows.replace("sun"," Dom");
            });
        });

        $scope.deleteServiceHours = function (serviceHours){
            serviceHours.filter(function (serviceHour){
                if (serviceHour.selected){
                    serviceHoursAPI.deleteServiceHours(serviceHour.id).then(function (response){
                        loadServiceHours();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadServiceHours = function () {
            serviceHoursAPI.getServiceHours().then(function (response) {
                $scope.serviceHours = response.data;
                angular.forEach($scope.serviceHours, function(serviceHour){
                    angular.forEach(serviceHour.ServiceHoursDetails, function(detail){
                        detail.dows = detail.dows.replace("mon"," Seg");
                        detail.dows = detail.dows.replace("tue"," Ter");
                        detail.dows = detail.dows.replace("wed"," Qua");
                        detail.dows = detail.dows.replace("thu"," Qui");
                        detail.dows = detail.dows.replace("fri"," Sex");
                        detail.dows = detail.dows.replace("sat"," Sab");
                        detail.dows = detail.dows.replace("sun"," Dom");
                    });
                });
                $scope.checkServiceHourSelected();
            }, function (error){
                console.log(error);
            });
        };

        $scope.checkServiceHourSelected = function () {
            $scope.hasServiceHourSelected = $scope.serviceHours.some(function (serviceHour) {
                return serviceHour.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addServiceHour = function (serviceHour) {

        serviceHour = setDetails(serviceHour);

        serviceHoursAPI.saveServiceHours(serviceHour).then(function (response){
            delete $scope.serviceHour;
            $scope.serviceHourForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/serviceHours");
        });
    };

    $scope.editServiceHour = function (serviceHour) {

        serviceHour = setDetails(serviceHour);

        serviceHoursAPI.updateServiceHour(serviceHour.id, serviceHour).then(function (response){
            delete $scope.serviceHour;
            $scope.serviceHourForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/serviceHours");
        });
    };

    var setDetails = function (serviceHour){
        if(!serviceHour.sendTo){
            serviceHour.sendTo = "hangup";
        }

        serviceHour.ivrs = [];
        serviceHour.queues = [];
        angular.forEach($scope.ivrs, function(ivr){
            if(ivr.checked){
                serviceHour.ivrs.push(ivr.id);
            }
        });
        angular.forEach($scope.queues, function(queue){
            if(queue.checked){
                serviceHour.queues.push(queue.id);
            }
        });

        angular.forEach(serviceHour.serviceHoursDetails, function(detail){
            detail.startTime = detail.startTimeTmp.toISOString().substring(11,16);
            detail.endTime = detail.endTimeTmp.toISOString().substring(11,16);

            delete detail.startTimeFmt;
            delete detail.endTimeFmt;

            detail.dows = [];

            angular.forEach(detail.dowsTmp, function(dow){
                if(dow.checked){
                    detail.dows.push(dow.id);
                }
                
            });

            detail.dows = detail.dows.toString();

            delete detail.dowsTmp;
        });

        return serviceHour;
    };

    $scope.emptySendToValue = function (){
        $scope.serviceHour.sendToValue = "";
    };

    $scope.addDetail = function (detail){
        var newDetail = {startTime: "", endTime: "", dowsTmp: [
            {id: "mon", name: "Seg", checked: false},
            {id: "tue", name: "Ter", checked: false},
            {id: "wed", name: "Qua", checked: false},
            {id: "thu", name: "Qui", checked: false},
            {id: "fri", name: "Sex", checked: false},
            {id: "sat", name: "Sab", checked: false},
            {id: "sun", name: "Dom", checked: false},
        ]};
        $scope.serviceHour.serviceHoursDetails.splice(($scope.serviceHour.serviceHoursDetails.indexOf(detail)+1),0, newDetail);
    };

    $scope.removeDetail = function (detail) {
        $scope.serviceHour.serviceHoursDetails.splice( $scope.serviceHour.serviceHoursDetails.indexOf(detail), 1 );
    };
});