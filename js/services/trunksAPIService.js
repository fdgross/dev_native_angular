angular.module("nativeIP").factory("trunksAPI", function($http, config){
    var _getTrunks = function(){
        return $http.get(config.baseUrl + "/trunks");
    };

    var _getTrunk = function(id){
        return $http.get(config.baseUrl + "/trunks/"+id);
    };

    var _saveTrunks = function(trunk){
        return $http.post(config.baseUrl + "/trunks", trunk);
    };

    var _updateTrunk = function(id, trunk){
        return $http.put(config.baseUrl + "/trunks/"+id, trunk);
    };

    var _deleteTrunks = function(id){
        return $http.delete(config.baseUrl + "/trunks/"+id);
    };

    return {
        getTrunks: _getTrunks,
        getTrunk: _getTrunk,
        saveTrunks: _saveTrunks,
        updateTrunk: _updateTrunk,
        deleteTrunks: _deleteTrunks
    };
});