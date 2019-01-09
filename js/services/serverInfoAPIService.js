angular.module("nativeIP").factory("serverInfoAPI", function($http, config){
    var _getServerInfo = function(){
        return $http.get(config.baseUrl + "/serverInfo");
    };

    return {
        getServerInfo: _getServerInfo
    };
});