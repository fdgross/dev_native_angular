angular.module("nativeIP").factory("ivrsAPI", function($http, config){
    var _getIvrs = function(){
        return $http.get(config.baseUrl + "/ivrs");
    };

    var _getIvr = function(id){
        return $http.get(config.baseUrl + "/ivrs/"+id);
    };

    var _saveIvrs = function(moh){
        return $http.post(config.baseUrl + "/ivrs", moh);
    };

    var _updateIvr = function(id, moh){
        return $http.put(config.baseUrl + "/ivrs/"+id, moh);
    };

    var _deleteIvrs = function(id){
        return $http.delete(config.baseUrl + "/ivrs/"+id);
    };

    return {
        getIvrs: _getIvrs,
        getIvr: _getIvr,
        saveIvrs: _saveIvrs,
        updateIvr: _updateIvr,
        deleteIvrs: _deleteIvrs
    };
});