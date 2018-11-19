angular.module("nativeIP").factory("outRoutesAPI", function($http, config){
    var _getOutRoutes = function(){
        return $http.get(config.baseUrl + "/outRoutes");
    };

    var _getOutRoute = function(id){
        return $http.get(config.baseUrl + "/outRoutes/"+id);
    };

    var _saveOutRoutes = function(outRoute){
        return $http.post(config.baseUrl + "/outRoutes", outRoute);
    };

    var _updateOutRoute = function(id, outRoute){
        return $http.put(config.baseUrl + "/outRoutes/"+id, outRoute);
    };

    var _deleteOutRoutes = function(id){
        return $http.delete(config.baseUrl + "/outRoutes/"+id);
    };

    return {
        getOutRoutes: _getOutRoutes,
        getOutRoute: _getOutRoute,
        saveOutRoutes: _saveOutRoutes,
        updateOutRoute: _updateOutRoute,
        deleteOutRoutes: _deleteOutRoutes
    };
});