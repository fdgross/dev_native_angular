angular.module("nativeIP").config(function ($httpProvider){
    //$httpProvider.interceptors.push("timestampInterceptor");
    //$httpProvider.interceptors.push("errorInterceptor");
    $httpProvider.interceptors.push("tokenInterceptor");
    $httpProvider.interceptors.push("loadingInterceptor");
});