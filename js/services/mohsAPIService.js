angular.module("nativeIP").factory("mohsAPI", function($http, config){
    var _getMohs = function(){
        return $http.get(config.baseUrl + "/mohs");
    };

    var _getMoh = function(id){
        return $http.get(config.baseUrl + "/mohs/"+id);
    };

    var _saveMohs = function(moh){
        return $http.post(config.baseUrl + "/mohs", moh);
    };

    var _updateMoh = function(id, moh){
        return $http.put(config.baseUrl + "/mohs/"+id, moh);
    };

    var _deleteMohs = function(id){
        return $http.delete(config.baseUrl + "/mohs/"+id);
    };

    return {
        getMohs: _getMohs,
        getMoh: _getMoh,
        saveMohs: _saveMohs,
        updateMoh: _updateMoh,
        deleteMohs: _deleteMohs
    };
});