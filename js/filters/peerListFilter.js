angular.module("nativeIP").filter('peerListFilter', function () {
    // Just add arguments to your HTML separated by :
    // And add them as parameters here, for example:
    // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
    return function (dataArray, searchTerm) {
        // If no array is given, exit.
        if (!dataArray) {
            return;
        }
        // If no search term exists, return the array unfiltered.
        else if (!searchTerm) {
            return dataArray;
        }
        // Otherwise, continue.
        else {
            var term = searchTerm.toLowerCase();
            return dataArray.filter(function (item) {
                var termInUsername = item.username.toString().indexOf(term) > -1;
                var termInName = item.name.toLowerCase().indexOf(term) > -1;
                var termInProfile;
                if(item.Profile) termInProfile = item.Profile.name.toLowerCase().indexOf(term) > -1;
                var termInCategory;
                if(item.Category) termInCategory = item.Category.name.toLowerCase().indexOf(term) > -1;
                return termInUsername || termInName || termInProfile || termInCategory;
            });
        }
    };
});