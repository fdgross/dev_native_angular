angular.module("nativeIP").factory("apisAPI", function($http, config){
    var _getApis = function(){
        return $http.get(config.baseUrl + "/apis");
    };

    var _getApi = function(id){
        return $http.get(config.baseUrl + "/apis/"+id);
    };

    var _saveApis = function(api){
        return $http.post(config.baseUrl + "/apis", api);
    };

    var _updateApi = function(id, api){
        return $http.put(config.baseUrl + "/apis/"+id, api);
    };

    var _deleteApis = function(id){
        return $http.delete(config.baseUrl + "/apis/"+id);
    };

    return {
        getApis: _getApis,
        getApi: _getApi,
        saveApis: _saveApis,
        updateApi: _updateApi,
        deleteApis: _deleteApis
    };
});