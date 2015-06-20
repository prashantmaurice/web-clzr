
angular.module( 'clozerrWeb.dashboard.rewards', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.rewards', {
    url: '/rewards',
    views: {
      "dashboard-main": {
        controller: 'DashboardRewardsCtrl',
        templateUrl: 'dashboard/rewards/rewards.tpl.html'
      }
    },
    data:{ pageTitle: 'Rewards' }
  });
})

.controller( 'DashboardRewardsCtrl', function DashboardRewardsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

