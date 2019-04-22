angular.module("nativeIP").controller("meetmesController", function ($scope, meetme, meetmes, meetmesAPI, $location) {

    $scope.datepickerOptions = {
        minDate: new Date(),
        showWeeks: false,
        yearRows: 1
    };

    if(meetme){
        $scope.meetme = meetme.data;
        var arrDate = $scope.meetme.date.split("-");
        $scope.date = new Date(arrDate[0], arrDate[1]-1, arrDate[2]);
    }

    if(meetmes){
        $scope.meetmes = meetmes.data;

        $scope.deleteMeetmes = function (meetmes){
            meetmes.filter(function (meetme){
                if (meetme.selected){
                    meetmesAPI.deleteMeetmes(meetme.id).then(function (response){
                        loadMeetmes();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                }
            });
        };

        var loadMeetmes = function () {
            meetmesAPI.getMeetmes().then(function (response) {
                $scope.meetmes = response.data;
                $scope.checkMeetmeSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkMeetmeSelected = function () {
            $scope.hasMeetmeSelected = $scope.meetmes.some(function (meetme) {
                return meetme.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addMeetme = function (meetme) {
        meetmesAPI.saveMeetmes(meetme).then(function (response){
            delete $scope.meetme;
            $scope.meetmeForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/meetmes");
        });
    };

    $scope.editMeetme = function (meetme) {
        meetmesAPI.updateMeetme(meetme.id, meetme).then(function (response){
            delete $scope.meetme;
            $scope.meetmeForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/meetmes");
        });
    };

    $scope.getStartTime = function(){
        if(!$scope.meetme.startTime){
            $scope.meetme.startTime = new Date().toLocaleTimeString();
            return new Date();
        }
        else{
            return formatHours($scope.meetme.startTime);
        }
    };

    $scope.getEndTime = function(){
        if(!$scope.meetme.endTime){
            $scope.meetme.endTime = new Date().toLocaleTimeString();
            return new Date();
        }
        else{
            return formatHours($scope.meetme.endTime);
        }
    };

    $scope.getRandomPassword = function(){
        if(!$scope.meetme.password){
            return Math.floor(Math.random() * (9999 - 1000) + 1000);
        }
        else{
            return $scope.meetme.password;
        }
    };

    $scope.dateChanged = function (){
        $scope.meetme.date = $scope.date.toISOString().substring(0, 10);
    };

    $scope.startTimeChanged = function (){
        if($scope.endTime <= $scope.startTime){
            $scope.endTime = addMinutes(1, $scope.startTime);
            $scope.endTime = new Date($scope.startTime.getTime() + 1*60000);
            $scope.meetme.startTime = $scope.startTime.toLocaleTimeString();
            $scope.meetme.endTime = $scope.endTime.toLocaleTimeString();
        }
        else{
            $scope.meetme.startTime = $scope.startTime.toLocaleTimeString();
        }
    };

    $scope.endTimeChanged = function (){
        if($scope.endTime <= $scope.startTime){
            $scope.startTime = new Date($scope.endTime.getTime() - 1*60000);
            $scope.meetme.startTime = $scope.startTime.toLocaleTimeString();
            $scope.meetme.endTime = $scope.endTime.toLocaleTimeString();
        }
        else{
            $scope.meetme.endTime = $scope.endTime.toLocaleTimeString();
        }
    };

    var formatHours = function(adjTime){
        var oDate = new Date();
        oDate.setHours(
            parseInt(adjTime.substr(0, 2), 10),
            parseInt(adjTime.substr(3, 2), 10),
            0,
            0
        );
        return oDate;
    };
});