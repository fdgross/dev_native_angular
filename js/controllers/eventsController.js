angular.module("nativeIP").controller("eventsController", function ($scope, event, events, peers, queues, ivrs, eventsAPI, $location, $filter) {

    if(!events){
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

    $scope.datepickerOptions = {
        minDate: new Date(),
        showWeeks: false,
        yearRows: 1
    };

    if(!event){
        $scope.event = {};
    }

    if(event){
        $scope.event = event.data;

        angular.forEach($scope.event.Ivrs, function(ivr){
            var objIvr = $filter('filter')($scope.ivrs, ivr.id, true)[0];
            objIvr.checked = true;
        });

        angular.forEach($scope.event.Queues, function(queue){
            var objQueue = $filter('filter')($scope.queues, queue.id, true)[0];
            objQueue.checked = true;
        });

        if($scope.event.sendTo !== 'external'){
            $scope.event.sendToValue = parseInt($scope.event.sendToValue);
        }

        $scope.event.dateStart = new Date($scope.event.dateStart);
        $scope.event.dateEnd = new Date($scope.event.dateEnd);

        $scope.dateStart = new Date($scope.event.dateStart.valueOf() + $scope.event.dateStart.getTimezoneOffset() * 60000);
        $scope.dateEnd = new Date($scope.event.dateEnd.valueOf() + $scope.event.dateEnd.getTimezoneOffset() * 60000);
    }

    if(events){
        $scope.events = events.data;

        $scope.deleteEvents = function (events){
            events.filter(function (event){
                if (event.selected){
                    eventsAPI.deleteEvents(event.id).then(function (response){
                        loadEvents();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadEvents = function () {
            eventsAPI.getEvents().then(function (response) {
                $scope.events = response.data;
                $scope.checkEventSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkEventSelected = function () {
            $scope.hasEventSelected = $scope.events.some(function (event) {
                return event.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addEvent = function (event) {
        
        event = setQueuesIvrs(event);

        eventsAPI.saveEvents(event).then(function (response){
            delete $scope.event;
            $scope.eventForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/events");
        });
    };

    $scope.editEvent = function (event) {

        event = setQueuesIvrs(event);

        eventsAPI.updateEvent(event.id, event).then(function (response){
            delete $scope.event;
            $scope.eventForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/events");
        });
    };

    var setQueuesIvrs = function (event){
        if(!event.sendTo){
            event.sendTo = "hangup";
        }

        event.ivrs = [];
        event.queues = [];
        angular.forEach($scope.ivrs, function(ivr){
            if(ivr.checked){
                event.ivrs.push(ivr.id);
            }
        });
        angular.forEach($scope.queues, function(queue){
            if(queue.checked){
                event.queues.push(queue.id);
            }
        });

        return event;
    };

    $scope.emptySendToValue = function (){
        $scope.event.sendToValue = "";
    };

    $scope.dateChanged = function (){
        if(!$scope.dateStart){
            $scope.dateStart = $scope.dateEnd;
        }
        if(!$scope.dateEnd){
            $scope.dateEnd = new Date($scope.dateStart.getTime() + 1439*60000);
        }
       
        $scope.event.dateStart = new Date($scope.dateStart.valueOf() - $scope.dateStart.getTimezoneOffset() * 60000);
        $scope.event.dateEnd = new Date($scope.dateEnd.valueOf() - $scope.dateEnd.getTimezoneOffset() * 60000);
    };
});