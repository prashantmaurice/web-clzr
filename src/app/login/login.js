
angular.module( 'clozerrWeb.login', [
  'ui.router',
  'clozerrWeb.api',
  'placeholders',
   'ui-notification'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $scope, utils, $state, api, Notification, $localForage, $rootScope ) {
        $scope.cred = {};
        $scope.signIn = function (cred) {
            // Call the login api

            utils.login(cred.username, cred.password).then(function(result){
                $state.go('dashboard.home');
            });


        };
})

;

