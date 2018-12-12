angular.module("nativeIP").controller("mohsController", function ($scope, moh, mohs, mohsAPI, uploadsAPI, $location, $timeout, config) {
    
    $scope.baseUrl = config.baseUrl;

    if(moh){
        $scope.moh = moh.data;
        if($scope.moh.files.length){
            var arrFiles = $scope.moh.files.split(",");
            $scope.moh.files = new Array;
            angular.forEach(arrFiles, function (file) {
                $scope.moh.files.push({'name': file, 'new': false});
            });
        }
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
        if(moh.files){
            var arrFiles = moh.files;
            moh.files = new Array;
            angular.forEach(arrFiles, function (file) {
                moh.files.push(file.name);
            });
            moh.files = moh.files.toString();
        }
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
        if(moh.files){
            var arrFiles = moh.files;
            moh.files = new Array;
            angular.forEach(arrFiles, function (file) {
                moh.files.push(file.name);
            });
            moh.files = moh.files.toString();
        }
        mohsAPI.updateMoh(moh.id, moh).then(function (response){
            delete $scope.moh;
            $scope.mohForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/mohs");
        });
    };

    $scope.uploadFile = function (currentFile, moh) {
        var file = currentFile;
        var promise = uploadsAPI.saveUploads(file, function (e) {
            if (e.lengthComputable) {
                var progressBar = Math.floor((e.loaded / e.total) * 100);
                $scope.fileUploadProgress = progressBar;
                $scope.myStyle = {"width": progressBar+"%"};
                $timeout(function () { delete $scope.fileUploadProgress; }, 2000);
            }
        });

        promise.then(function (response) {
            if(!moh.files){
                moh.files = new Array;
            }
            moh.files.push({'name': currentFile.name, 'new': true});
            $scope.serverResponse = response;
        }, function (error) {
            console.log(error);
            $scope.serverResponse = 'An error has occurred';
        });

    };

    $scope.removeFile = function (file, moh, index) {
        var fileName = file.name;
        if(file.new){
            var file = 'uploads_tmp/'+fileName;
        }
        else{
            var file = 'mohs/'+moh.id+'/'+fileName;
        }
        uploadsAPI.deleteUploads(file)
            .then(function (response) {
                moh.files.splice(index, 1);
                $scope.serverResponse = response;
            }, function (error) {
                console.log(error);
                $scope.serverResponse = 'An error has occurred';
            });
    };
});