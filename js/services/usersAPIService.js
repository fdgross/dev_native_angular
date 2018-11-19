angular.module("nativeIP").factory("usersAPI", function($http, config){
    var _getUsers = function(){
        return $http.get(config.baseUrl + "/users");
    };

    var _getUser = function(id){
        return $http.get(config.baseUrl + "/users/"+id);
    };

    var _saveUsers = function(user){
        return $http.post(config.baseUrl + "/users", user);
    };

    var _updateUser = function(id, user){
        return $http.put(config.baseUrl + "/users/"+id, user);
    };

    var _deleteUsers = function(id){
        return $http.delete(config.baseUrl + "/users/"+id);
    };

    return {
        getUsers: _getUsers,
        getUser: _getUser,
        saveUsers: _saveUsers,
        updateUser: _updateUser,
        deleteUsers: _deleteUsers
    };
});