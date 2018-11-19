angular.module("nativeIP").factory("profilesAPI", function($http, config){
    var _getProfiles = function(){
        return $http.get(config.baseUrl + "/profiles");
    };

    var _getProfile = function(id){
        return $http.get(config.baseUrl + "/profiles/"+id);
    };

    var _saveProfiles = function(profile){
        return $http.post(config.baseUrl + "/profiles", profile);
    };

    var _updateProfile = function(id, profile){
        return $http.put(config.baseUrl + "/profiles/"+id, profile);
    };

    var _deleteProfiles = function(id){
        return $http.delete(config.baseUrl + "/profiles/"+id);
    };

    return {
        getProfiles: _getProfiles,
        getProfile: _getProfile,
        saveProfiles: _saveProfiles,
        updateProfile: _updateProfile,
        deleteProfiles: _deleteProfiles
    };
});