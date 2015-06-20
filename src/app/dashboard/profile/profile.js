
angular.module( 'clozerrWeb.dashboard.profile', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.profile', {
    url: '/profile',
    views: {
      "dashboard-main": {
        controller: 'DashboardProfileCtrl',
        templateUrl: 'dashboard/profile/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'Profile' }
  });
})

.controller( 'DashboardProfileCtrl', function DashboardProfileCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

