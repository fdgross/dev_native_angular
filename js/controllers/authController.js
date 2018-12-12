angular.module("nativeIP").controller("authController", function ($scope, $rootScope, authAPI, usersAPI, $location, $window) {

    authAPI.logout();

    $rootScope.logged = false;
    $scope.login = function(user){
        authAPI.login(user).then((response) => {
            $rootScope.logged = true;
            $window.localStorage.token = response.data.token;
            $window.localStorage.loggedUserName = response.data.user.name;
            $window.localStorage.loggedUserUsername = response.data.user.username;
            $window.localStorage.loggedUserPermissions = response.data.user.permissions;
            if(response.data.user.avatar){
                $window.localStorage.loggedUserAvatar = response.data.user.avatar;
            }
            else{
                $window.localStorage.loggedUserAvatar = "user.jpg";
            }
            $rootScope.loggedUserName = response.data.user.name;
            $rootScope.loggedUserUsername = response.data.user.username;
            $rootScope.loggedUserPermissions = response.data.user.permissions;
            $rootScope.loggedUserAvatar = $window.localStorage.loggedUserAvatar;
            
            $location.path("/peers");
        }, function (error){
            user.error = true;
            $location.path("/login");
        });
    };

    $scope.logout = function(){
        authAPI.logout();
        $location.path("/login");
    };
});