angular.module("nativeIP").factory("costCentersAPI", function($http, config){
    var _getCostCenters = function(){
        return $http.get(config.baseUrl + "/costCenters");
    };

    var _getCostCenter = function(id){
        return $http.get(config.baseUrl + "/costCenters/"+id);
    };

    var _saveCostCenters = function(category){
        return $http.post(config.baseUrl + "/costCenters", category);
    };

    var _updateCostCenter = function(id, category){
        return $http.put(config.baseUrl + "/costCenters/"+id, category);
    };

    var _deleteCostCenters = function(id){
        return $http.delete(config.baseUrl + "/costCenters/"+id);
    };

    return {
        getCostCenters: _getCostCenters,
        getCostCenter: _getCostCenter,
        saveCostCenters: _saveCostCenters,
        updateCostCenter: _updateCostCenter,
        deleteCostCenters: _deleteCostCenters
    };
});