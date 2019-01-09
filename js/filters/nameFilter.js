angular.module("nativeIP").filter("name", function(){
    return function (input){
        var namesList = input.split(" ");
        var formattedNamesList = namesList.map(function(name){
            if(/(da|de)/.test(name)) return name;
            return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        });
        return formattedNamesList.join(" ");
    };
});