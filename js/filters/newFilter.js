angular.module("nativeIP").filter("new", function(){
    return function (input, days){
        var today = new Date();
        var dateVerified = new Date(input).getTime();
        var threeDaysAgo = new Date().setDate(today.getDate()-days);
        var output = false;
        if(dateVerified >= threeDaysAgo) output = true;
        return output;
    };
});