
angular.module( 'clozerrWeb.logout', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'logout', {
    url: '/logout',
    views: {
      "main": {
        controller: 'LogoutCtrl',
        templateUrl: 'logout/logout.tpl.html'
      }
    },
    data:{ pageTitle: 'Logout' }
  });
})

.controller( 'LogoutCtrl', function LogoutCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

