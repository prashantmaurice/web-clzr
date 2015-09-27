angular.module( 'clozerrWeb.dashboard.promote', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.promote', {
    url: '/main',
    views: {
      "dashboard-main": {
        controller: 'DashboardPromoteCtrl',
        templateUrl: 'dashboard/main/promote.tpl.html'
      }
    },
    data:{ 
      pageTitle: 'Promote',
      dashboardPageHeading: 'Promote' 
    }
  });
})

.controller( 'DashboardPromoteCtrl', function DashboardPromoteCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
