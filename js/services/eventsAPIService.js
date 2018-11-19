angular.module("nativeIP").factory("eventsAPI", function($http, config){
    var _getEvents = function(){
        return $http.get(config.baseUrl + "/events");
    };

    var _getEvent = function(id){
        return $http.get(config.baseUrl + "/events/"+id);
    };

    var _saveEvents = function(event){
        return $http.post(config.baseUrl + "/events", event);
    };

    var _updateEvent = function(id, event){
        return $http.put(config.baseUrl + "/events/"+id, event);
    };

    var _deleteEvents = function(id){
        return $http.delete(config.baseUrl + "/events/"+id);
    };

    return {
        getEvents: _getEvents,
        getEvent: _getEvent,
        saveEvents: _saveEvents,
        updateEvent: _updateEvent,
        deleteEvents: _deleteEvents
    };
});