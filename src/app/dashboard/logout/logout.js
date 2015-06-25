
angular.module( 'clozerrWeb.dashboard.logout', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.logout', {
    url: '/logout',
    views: {
      "dashboard-main": {
        controller: 'DashboardLogoutCtrl',
        templateUrl: 'dashboard/logout/logout.tpl.html'
      }
    },
    data:{ pageTitle: 'Logout' }
  });
})

.controller( 'DashboardLogoutCtrl', function DashboardLogoutCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

