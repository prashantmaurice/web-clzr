angular.module( 'clozerrWeb.dashboard', [
  'ui.router',
  'placeholders',
  'clozerrWeb.dashboard.home',
  'clozerrWeb.dashboard.login',
  'clozerrWeb.dashboard.logout',
  'clozerrWeb.dashboard.rewards',
  'clozerrWeb.dashboard.loyalty',
  'clozerrWeb.dashboard.campaigns',
  'clozerrWeb.dashboard.clubmembers',
  'clozerrWeb.dashboard.profile',
  'clozerrWeb.dashboard.analytics',
  'clozerrWeb.dashboard.promote'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    abstract: true,
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.tpl.html'
      }
    },
    data:{ pageTitle: 'Dashboard' }
  });
})

.controller( 'DashboardCtrl', function DashboardCtrl( $scope , $rootElement) {
  // This is simple a demo for UI Boostrap. 
   $scope.isCollapsed = true;
   $rootElement.data("$$ngAnimateState").running = false; 
})

;
