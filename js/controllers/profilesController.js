angular.module("nativeIP").controller("profilesController", function ($scope, profile, profiles, outRoutes, profilesAPI, $location, $filter) {
    $scope.outRoutes = outRoutes.data;
    if(profile){
        $scope.profile = profile.data;

        if($scope.profile.OutRoutes){
            angular.forEach($scope.profile.OutRoutes, function(outRoute){
                var objOutRoute = $filter('filter')($scope.outRoutes, {id: outRoute.id}, true)[0];
                objOutRoute.checked = true;
            });
        }
    }

    if(profiles){
        $scope.profiles = profiles.data;

        angular.forEach(profiles.data, function(profile){
            delete profile.OutRoutes;
        });

        $scope.deleteProfiles = function (profiles){
            profiles.filter(function (profile){
                if (profile.selected){
                    profilesAPI.deleteProfiles(profile.id, $scope).then(function (response){
                        loadProfiles();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadProfiles = function () {
            profilesAPI.getProfiles().then(function (response) {
                $scope.profiles = response.data;
                $scope.checkProfileSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkProfileSelected = function () {
            $scope.hasProfileSelected = $scope.profiles.some(function (profile) {
                return profile.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addProfile = function (profile) {
        profile = setOutRoutes(profile);
        profilesAPI.saveProfiles(profile).then(function (response){
            delete $scope.profile;
            $scope.profileForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/profiles");
        });
    };

    $scope.editProfile = function (profile) {
        profile = setOutRoutes(profile);
        profilesAPI.updateProfile(profile.id, profile).then(function (response){
            delete $scope.profile;
            $scope.profileForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/profiles");
        });
    };

    var setOutRoutes = function (profile) {
        profile.outRoutes = new Array;
        angular.forEach($scope.outRoutes, function(outRoute, index) {
            if(outRoute.checked) {
                profile.outRoutes.push(outRoute.id);
            }
        });

        return profile;
    }
});