angular.module("nativeIP").factory("inRoutesAPI", function($http, config){
    var _getInRoutes = function(){
        return $http.get(config.baseUrl + "/inRoutes");
    };

    var _getInRoute = function(id){
        return $http.get(config.baseUrl + "/inRoutes/"+id);
    };

    var _saveInRoutes = function(inRoute){
        return $http.post(config.baseUrl + "/inRoutes", inRoute);
    };

    var _updateInRoute = function(id, inRoute){
        return $http.put(config.baseUrl + "/inRoutes/"+id, inRoute);
    };

    var _deleteInRoutes = function(id){
        return $http.delete(config.baseUrl + "/inRoutes/"+id);
    };

    return {
        getInRoutes: _getInRoutes,
        getInRoute: _getInRoute,
        saveInRoutes: _saveInRoutes,
        updateInRoute: _updateInRoute,
        deleteInRoutes: _deleteInRoutes
    };
});