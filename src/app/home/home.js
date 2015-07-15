
angular.module( 'clozerrWeb.home', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeCtrl( $scope, utils, $state, api, Notification, $localForage, $rootScope ) {
        $scope.cred = "aaa";
})

;

