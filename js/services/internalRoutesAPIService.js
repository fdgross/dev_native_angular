angular.module("nativeIP").factory("internalRoutesAPI", function($http, config){
    var _getInternalRoutes = function(){
        return $http.get(config.baseUrl + "/internalRoutes");
    };

    var _getInternalRoute = function(id){
        return $http.get(config.baseUrl + "/internalRoutes/"+id);
    };

    var _saveInternalRoutes = function(internalRoute){
        return $http.post(config.baseUrl + "/internalRoutes", internalRoute);
    };

    var _updateInternalRoute = function(id, internalRoute){
        return $http.put(config.baseUrl + "/internalRoutes/"+id, internalRoute);
    };

    var _deleteInternalRoutes = function(id){
        return $http.delete(config.baseUrl + "/internalRoutes/"+id);
    };

    return {
        getInternalRoutes: _getInternalRoutes,
        getInternalRoute: _getInternalRoute,
        saveInternalRoutes: _saveInternalRoutes,
        updateInternalRoute: _updateInternalRoute,
        deleteInternalRoutes: _deleteInternalRoutes
    };
});