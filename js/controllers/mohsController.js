angular.module("nativeIP").controller("mohsController", function ($scope, moh, mohs, mohsAPI, $location) {

    if(moh){
        $scope.moh = moh.data;
    }

    if(mohs){
        $scope.mohs = mohs.data;

        $scope.deleteMohs = function (mohs){
            mohs.filter(function (moh){
                if (moh.selected){
                    mohsAPI.deleteMohs(moh.id).then(function (response){
                        loadMohs();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadMohs = function () {
            mohsAPI.getMohs().then(function (response) {
                $scope.mohs = response.data;
                $scope.checkMohSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkMohSelected = function () {
            $scope.hasMohSelected = $scope.mohs.some(function (moh) {
                return moh.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addMoh = function (moh) {
        mohsAPI.saveMohs(moh).then(function (response){
            delete $scope.moh;
            $scope.mohForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/mohs");
        });
    };

    $scope.editMoh = function (moh) {
        mohsAPI.updateMoh(moh.id, moh).then(function (response){
            delete $scope.moh;
            $scope.mohForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/mohs");
        });
    };
});