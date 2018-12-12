angular.module("nativeIP").factory("uploadsAPI", function($http, config){
    var _getUpload = function(file){
        return $http.get(config.baseUrl + "/uploads/"+file);
    };

    var _saveUploads = function(file, progressCB){
        var fileFormData = new FormData();
        fileFormData.append('file', file);

        return $http.post(config.baseUrl + "/uploads", fileFormData, {
            file: fileFormData,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            uploadEventHandlers: {
                progress: progressCB
            }
        });
    };

    var _deleteUploads = function(file){
        return $http.delete(config.baseUrl + "/uploads/"+file);
    };

    return {
        getUpload: _getUpload,
        saveUploads: _saveUploads,
        deleteUploads: _deleteUploads
    };
});