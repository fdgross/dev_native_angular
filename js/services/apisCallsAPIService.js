angular.module("nativeIP").factory("apisCallsAPI", function($http, config){
    var _getApisCalls = function(){
        return $http.get(config.baseUrl + "/apisCalls");
    };

    var _getApiCall = function(id){
        return $http.get(config.baseUrl + "/apisCalls/"+id);
    };

    var _saveApisCalls = function(apiCall){
        return $http.post(config.baseUrl + "/apisCalls", apiCall);
    };

    var _updateApiCall = function(id, apiCall){
        return $http.put(config.baseUrl + "/apisCalls/"+id, apiCall);
    };

    var _deleteApisCalls = function(id){
        return $http.delete(config.baseUrl + "/apisCalls/"+id);
    };

    return {
        getApisCalls: _getApisCalls,
        getApiCall: _getApiCall,
        saveApisCalls: _saveApisCalls,
        updateApiCall: _updateApiCall,
        deleteApisCalls: _deleteApisCalls
    };
});