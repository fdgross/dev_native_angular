angular.module("nativeIP").service("permissionsAPI", function ($http, config) {
    this.getPermissions = function(){
        return $http.get(config.baseUrl + "/permissions");
    };
});