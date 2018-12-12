angular.module("nativeIP").factory("authAPI", function($http, config, $window){
    var _login = function(user){
        return $http.post(config.baseUrl + "/token", user);
    };

    var _logout = function(){
        delete $window.localStorage.token;
        delete $window.localStorage.user;
        return true;
    };

    return {
        login: _login,
        logout: _logout
    };
});