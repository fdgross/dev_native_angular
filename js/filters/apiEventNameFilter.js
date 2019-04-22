angular.module("nativeIP").filter("apiEventName", function(){
    return function (input, events) {
        var output = "";
        events.filter(function (event){
            if (input === event.event){
                output = event.name;
            }
        });
        
        return output;
    };
});