angular.module("nativeIP").factory("serviceHoursAPI", function($http, config){
    var _getServiceHours = function(){
        return $http.get(config.baseUrl + "/serviceHours");
    };

    var _getServiceHour = function(id){
        return $http.get(config.baseUrl + "/serviceHours/"+id);
    };

    var _saveServiceHours = function(serviceHour){
        return $http.post(config.baseUrl + "/serviceHours", serviceHour);
    };

    var _updateServiceHour = function(id, serviceHour){
        return $http.put(config.baseUrl + "/serviceHours/"+id, serviceHour);
    };

    var _deleteServiceHours = function(id){
        return $http.delete(config.baseUrl + "/serviceHours/"+id);
    };

    return {
        getServiceHours: _getServiceHours,
        getServiceHour: _getServiceHour,
        saveServiceHours: _saveServiceHours,
        updateServiceHour: _updateServiceHour,
        deleteServiceHours: _deleteServiceHours
    };
});