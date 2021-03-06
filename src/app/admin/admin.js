angular.module( 'clozerrWeb.admin', [
  'ui.router',
  'placeholders',
  'clozerrWeb.admin.events',
  'clozerrWeb.admin.reports',
  'clozerrWeb.admin.geofencing'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin', {
    url: '/admin',
    abstract: true,
    views: {
      "main": {
        controller: 'AdminCtrl',
        templateUrl: 'admin/admin.tpl.html'
      }
    },
    resolve:{
      loggedin: ['utils', function(auth){return auth.isLoggedIn();}]
    },
    data:{ pageTitle: 'Admin Terminal' }
  });
})

.controller( 'AdminCtrl', function AdminCtrl( $scope , utils) {
	console.log("AdminCtrl");
      $scope.logOut = function() {
          utils.logout();
      };
});
