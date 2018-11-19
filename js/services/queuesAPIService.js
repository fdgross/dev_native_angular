angular.module("nativeIP").factory("queuesAPI", function($http, config){
    var _getQueues = function(){
        return $http.get(config.baseUrl + "/queues");
    };

    var _getQueue = function(id){
        return $http.get(config.baseUrl + "/queues/"+id);
    };

    var _saveQueues = function(queue){
        return $http.post(config.baseUrl + "/queues", queue);
    };

    var _updateQueue = function(id, queue){
        return $http.put(config.baseUrl + "/queues/"+id, queue);
    };

    var _deleteQueues = function(id){
        return $http.delete(config.baseUrl + "/queues/"+id);
    };

    return {
        getQueues: _getQueues,
        getQueue: _getQueue,
        saveQueues: _saveQueues,
        updateQueue: _updateQueue,
        deleteQueues: _deleteQueues
    };
});