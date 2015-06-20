angular.module( 'clozerrWeb.dashboard.home', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.home', {
    url: '/home',
    views: {
      "dashboard-main": {
        controller: 'DashboardHomeCtrl',
        templateUrl: 'dashboard/home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'DashboardHomeCtrl', function DashboardHomeCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
