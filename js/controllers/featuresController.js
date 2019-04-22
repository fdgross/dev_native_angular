angular.module("nativeIP").controller("featuresController", function ($scope, features, featuresAPI, $location, $filter) {
    var jsonData = {};
    $scope.objFeatures = features.data;
    angular.forEach(features.data, function(feature){
        jsonData[feature.feature] = feature.value;
    });
    $scope.features = jsonData;

    $scope.editFeatures = function (features) {
        angular.forEach(features, function(value, key){
            var objFeature = $filter('filter')($scope.objFeatures, {feature: key}, true)[0];
            if(objFeature){
                if(value !== objFeature.value){
                    objFeature.value = value;
                    delete objFeature.createdAt;
                    delete objFeature.updatedAt;
                    editFeature(objFeature);
                }
            }
            else{
                var newFeature = {};
                newFeature.feature = key;
                newFeature.value = value;
                addFeature(newFeature);
            }
        });
        
    };

     var addFeature = function (feature) {
        featuresAPI.saveFeatures(feature).then(function (response){}, function (error){
            console.log(error);
            $scope.returnStatus = error.status;
        }).then(function (response) {
            //$location.path("/features");
        });
    };

    var editFeature = function (feature) {
        featuresAPI.updateFeature(feature.id, feature).then(function (response){}, function (error){
            console.log(error);
            $scope.returnStatus = error.status;
        }).then(function (response) {
            //$location.path("/features");
        });
    };
});