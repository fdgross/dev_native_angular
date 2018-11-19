angular.module("nativeIP").factory("groupsAPI", function($http, config){
    var _getGroups = function(){
        return $http.get(config.baseUrl + "/groups");
    };

    var _getGroup = function(id){
        return $http.get(config.baseUrl + "/groups/"+id);
    };

    var _saveGroups = function(group){
        return $http.post(config.baseUrl + "/groups", group);
    };

    var _updateGroup = function(id, group){
        return $http.put(config.baseUrl + "/groups/"+id, group);
    };

    var _deleteGroups = function(id){
        return $http.delete(config.baseUrl + "/groups/"+id);
    };

    return {
        getGroups: _getGroups,
        getGroup: _getGroup,
        saveGroups: _saveGroups,
        updateGroup: _updateGroup,
        deleteGroups: _deleteGroups
    };
});