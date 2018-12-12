angular.module("nativeIP").directive("fileModel", function ($parse) {
    return {
        restrict: 'A', //the directive can be used as an attribute only
        /*
            link is a function that defines functionality of directive
            scope: scope associated with the element
            element: element on which this directive used
            attrs: key value pair of element attributes
            */
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel),
                modelSetter = model.assign; //define a setter for fileModel

            //Bind change event on the element
            element.bind('change', function () {
                var file = element[0].files[0];
                delete scope.fileUploadProgress;
                //Call apply on scope, it checks for value changes and reflect them on UI
                scope.$apply(function () {
                    //set the model value
                    if((file.type === 'audio/wav')||(file.type === 'audio/mpeg')){
                        modelSetter(scope, file);
                        //scope.currentFile = file;
                        scope.audioError=false;
                    }
                    else{
                        scope.audioError=true;
                    }
                });
            });
        }
    };
});