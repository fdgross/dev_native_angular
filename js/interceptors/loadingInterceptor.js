angular.module("nativeIP").factory("loadingInterceptor", function($q, $rootScope, $timeout){
    return {
        request: function(config){
            var url = config.url;
            $rootScope.loading = true;
            if((url.indexOf('uploads') > -1) || (url.indexOf('serverInfo') > -1)){
                $rootScope.loading = false;
            }
            return config;
        },
        requestError: function(rejection){
            $rootScope.loading = false;
            return $q.reject(rejection);
        },
        response: function(response){
            $rootScope.loading = false;
            return response;
        },
        responseError: function(rejection){
            $rootScope.loading = false;
            return $q.reject(rejection);
        }
    }
});