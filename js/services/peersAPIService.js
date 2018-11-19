angular.module("nativeIP").factory("peersAPI", function($http, config){
    var _getPeers = function(){
        return $http.get(config.baseUrl + "/peers");
    };

    var _getPeer = function(id){
        return $http.get(config.baseUrl + "/peers/"+id);
    };

    var _savePeers = function(peer){
        return $http.post(config.baseUrl + "/peers", peer);
    };

    var _updatePeer = function(id, peer){
        return $http.put(config.baseUrl + "/peers/"+id, peer);
    };

    var _deletePeers = function(id){
        return $http.delete(config.baseUrl + "/peers/"+id);
    };

    return {
        getPeers: _getPeers,
        getPeer: _getPeer,
        savePeers: _savePeers,
        updatePeer: _updatePeer,
        deletePeers: _deletePeers
    };
});