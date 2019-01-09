angular.module("nativeIP", ["ngMessages", "ngRoute", "ngLocale", "ui.bootstrap", "ui.bootstrap.tpls", "dndLists", "n3-pie-chart"]).run(run);

function run($rootScope, $http, $location, $window) {
    //Aqui iremos redirecionar para a página de Login, caso o usuário não esteja logado:
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicArea = ['/login'];
        var restrictArea = publicArea.indexOf($location.path()) === -1;

        $rootScope.logged = false;
        $rootScope.loggedUserName = '';
        $rootScope.loggedUserUsername = '';
        if($window.localStorage.loggedUserUsername){
            $rootScope.logged = true;
            $rootScope.loggedUserName = $window.localStorage.loggedUserName;
            $rootScope.loggedUserUsername = $window.localStorage.loggedUserUsername;
            $rootScope.loggedUserAvatar = $window.localStorage.loggedUserAvatar;
            $rootScope.loggedUserPermissions = $window.localStorage.loggedUserPermissions;
        }

        if (restrictArea && !$window.localStorage.loggedUserUsername) {
          $location.path('/login');
        }
    });
}