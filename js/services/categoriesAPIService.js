angular.module("nativeIP").factory("categoriesAPI", function($http, config){
    var _getCategories = function(){
        return $http.get(config.baseUrl + "/categories");
    };

    var _getCategory = function(id){
        return $http.get(config.baseUrl + "/categories/"+id);
    };

    var _saveCategories = function(category){
        return $http.post(config.baseUrl + "/categories", category);
    };

    var _updateCategory = function(id, category){
        return $http.put(config.baseUrl + "/categories/"+id, category);
    };

    var _deleteCategories = function(id){
        return $http.delete(config.baseUrl + "/categories/"+id);
    };

    return {
        getCategories: _getCategories,
        getCategory: _getCategory,
        saveCategories: _saveCategories,
        updateCategory: _updateCategory,
        deleteCategories: _deleteCategories
    };
});