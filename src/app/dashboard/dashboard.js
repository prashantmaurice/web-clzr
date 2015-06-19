angular.module( 'clozerrWeb.dashboard', [
  'ui.router',
  'placeholders',
  'clozerrWeb.dashboard.home'
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
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'DashboardCtrl', function DashboardCtrl( $scope, $mdSidenav ) {
  // This is simple a demo for UI Boostrap.
  $scope.toggleMenu = function() {
    $mdSidenav('left').toggle();
  };
})

;
