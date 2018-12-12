angular.module("nativeIP").factory("tokenInterceptor", function($window){
    return {
        request: function (config) {
            var url = config.url;
            if(url.indexOf('view') > -1) return config;
            var token = $window.localStorage.token;
            if(token){
                config.headers.Authorization = 'Bearer '+token;
            }
            return config;
        }    
    };
});