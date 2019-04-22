angular.module("nativeIP").controller("callRatingsController", function ($scope, ivr, ivrs, ivrsAPI, uploadsAPI, $location, $timeout, config, $filter) {
    
    $scope.baseUrl = config.baseUrl;

    if(ivr){
        $scope.callRating = JSON.parse(ivr.data.basicDefinition);
        $scope.callRating.id = ivr.data.id;
        $scope.callRating.name = ivr.data.name;
        $scope.callRating.description = ivr.data.description;
        $scope.callRating.createdAt = ivr.data.createdAt;
        $scope.callRating.updatedAt = ivr.data.updatedAt;
        
        if($scope.callRating.fileMain){
            $scope.callRating.fileMain.file.new = false;
        }
        if($scope.callRating.fileError){
            $scope.callRating.fileError.file.new = false;
        }
        if($scope.callRating.fileSuccess){
            $scope.callRating.fileSuccess.file.new = false;
        }
    }

    if(!ivr){
        $scope.callRating = {};
        $scope.callRating.fileMain = {};
        $scope.callRating.fileError = {};
        $scope.callRating.fileSuccess = {};
        $scope.callRating.endAction = 'hangup';
    }
    
    $scope.callRatings = $filter('filter')(ivrs.data, {mode: 'callRating'}, true);

    $scope.deleteCallRatings = function (callRatings){
        callRatings.filter(function (callRating){
            if (callRating.selected){
                ivrsAPI.deleteIvrs(callRating.id).then(function (response){
                    loadCallRatings();
                }, function (error) {
                    $scope.returnStatus = error.status;
                });
            }
        });
    };

    var loadCallRatings = function () {
        ivrsAPI.getIvrs().then(function (response) {
            $scope.callRatings = $filter('filter')(response.data, {mode: 'callRating'}, true);
            $scope.checkCallRatingsSelected();
        }, function (error){
            console.log(error);
        });
    };

    $scope.checkCallRatingsSelected = function () {
        $scope.hasCallRatingSelected = $scope.callRatings.some(function (callRating) {
            return callRating.selected;
        });
    };

    $scope.orderBy = function (field) {
        $scope.orderField = field;
        $scope.direction = !$scope.direction;
    };

    $scope.addCallRating = function (callRating) {
        
        var newCallRating = {name: callRating.name, description: callRating.description, type: 'customRule', mode: 'callRating'};
        delete callRating.name;
        delete callRating.description;
        newCallRating.basicDefinition = angular.toJson(callRating);

        ivrsAPI.saveIvrs(newCallRating).then(function (response){
            delete $scope.callRating;
            $scope.callRatingForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/callRatings");
        });
    };

    $scope.editCallRating = function (callRating) {
        
        var newCallRating = {name: callRating.name, description: callRating.description, type: 'customRule', mode: 'callRating'};
        delete callRating.name;
        delete callRating.description;
        newCallRating.basicDefinition = angular.toJson(callRating);

        ivrsAPI.updateIvr(callRating.id, newCallRating).then(function (response){
            delete $scope.callRating;
            $scope.callRatingForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/callRatings");
        });
    };

    var setDetails = function(callRating){
        callRating.type = "customRule";
        callRating.ivrDetails = [];
        return callRating;
    };

    $scope.uploadFile = function (currentFile, item) {
        var file = currentFile;
        var promise = uploadsAPI.saveUploads(file, function (e) {
            if (e.lengthComputable) {
                var progressBar = Math.floor((e.loaded / e.total) * 100);
                item.fileUploadProgress = progressBar;
                item.myStyle = {"width": progressBar+"%"};
                $timeout(function () { 
                    delete item.fileUploadProgress; 
                    delete item.myStyle; 
                }, 2000);
            }
        });

        promise.then(function (response) {
            item.file = {'name': currentFile.name, 'new': true};
        }, function (error) {
            console.log(error);
            $scope.serverResponse = 'An error has occurred';
        });
    };
});