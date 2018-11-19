angular.module("nativeIP").factory("errorInterceptor", function($q, $location){
    return {
        responseError: function (rejection){
            if(rejection.status === 404) {
                $location.path("/error")
            }
            if(rejection.status === 422) {
                $location.path("/error");
                console.log(rejection);
            }
            return $q.reject(rejection);
        }
    }
});