angular.module("nativeIP").factory("meetmesAPI", function($http, config){
    var _getMeetmes = function(){
        return $http.get(config.baseUrl + "/meetmes");
    };

    var _getMeetme = function(id){
        return $http.get(config.baseUrl + "/meetmes/"+id);
    };

    var _saveMeetmes = function(meetme){
        return $http.post(config.baseUrl + "/meetmes", meetme);
    };

    var _updateMeetme = function(id, meetme){
        return $http.put(config.baseUrl + "/meetmes/"+id, meetme);
    };

    var _deleteMeetmes = function(id){
        return $http.delete(config.baseUrl + "/meetmes/"+id);
    };

    return {
        getMeetmes: _getMeetmes,
        getMeetme: _getMeetme,
        saveMeetmes: _saveMeetmes,
        updateMeetme: _updateMeetme,
        deleteMeetmes: _deleteMeetmes
    };
});