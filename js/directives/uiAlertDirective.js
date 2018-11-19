angular.module("nativeIP").directive("uiAlert", function(){
    return {
        templateUrl: "view/alert.html",
        replace: true,
        restrict: "E",
        scope: {
            title: "@",
            message: "="
        },
        transclude: true
    };
});