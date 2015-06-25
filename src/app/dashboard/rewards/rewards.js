
angular.module( 'clozerrWeb.dashboard.rewards', [
  'ui.router',
  'ui.bootstrap',
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
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

})

;

