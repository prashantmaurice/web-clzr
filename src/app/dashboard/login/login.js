
angular.module( 'clozerrWeb.dashboard.login', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.login', {
    url: '/login',
    views: {
      "dashboard-main": {
        controller: 'DashboardLoginCtrl',
        templateUrl: 'dashboard/login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'DashboardLoginCtrl', function DashboardLoginCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

