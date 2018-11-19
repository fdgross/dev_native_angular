angular.module("nativeIP").factory("featuresAPI", function($http, config){
    var _getFeatures = function(){
        return $http.get(config.baseUrl + "/features");
    };

    var _getFeature = function(id){
        return $http.get(config.baseUrl + "/features/"+id);
    };

    var _saveFeatures = function(feature){
        return $http.post(config.baseUrl + "/features", feature);
    };

    var _updateFeature = function(id, feature){
        return $http.put(config.baseUrl + "/features/"+id, feature);
    };

    var _deleteFeatures = function(id){
        return $http.delete(config.baseUrl + "/features/"+id);
    };

    return {
        getFeatures: _getFeatures,
        getFeature: _getFeature,
        saveFeatures: _saveFeatures,
        updateFeature: _updateFeature,
        deleteFeatures: _deleteFeatures
    };
});