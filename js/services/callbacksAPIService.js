angular.module("nativeIP").factory("callbacksAPI", function($http, config){
    var _getCallbacks = function(){
        return $http.get(config.baseUrl + "/callbacks");
    };

    var _getCallback = function(id){
        return $http.get(config.baseUrl + "/callbacks/"+id);
    };

    var _saveCallbacks = function(callback){
        return $http.post(config.baseUrl + "/callbacks", callback);
    };

    var _updateCallback = function(id, callback){
        return $http.put(config.baseUrl + "/callbacks/"+id, callback);
    };

    var _deleteCallbacks = function(id){
        return $http.delete(config.baseUrl + "/callbacks/"+id);
    };

    return {
        getCallbacks: _getCallbacks,
        getCallback: _getCallback,
        saveCallbacks: _saveCallbacks,
        updateCallback: _updateCallback,
        deleteCallbacks: _deleteCallbacks
    };
});