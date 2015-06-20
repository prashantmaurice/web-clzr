
angular.module( 'clozerrWeb.dashboard.clubmembers', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.clubmembers', {
    url: '/clubmembers',
    views: {
      "dashboard-main": {
        controller: 'DashboardClubmembersCtrl',
        templateUrl: 'dashboard/clubmembers/clubmembers.tpl.html'
      }
    },
    data:{ pageTitle: 'Clubmembers' }
  });
})

.controller( 'DashboardClubmembersCtrl', function DashboardClubmembersCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

