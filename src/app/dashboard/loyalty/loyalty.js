
angular.module( 'clozerrWeb.dashboard.loyalty', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.loyalty', {
    url: '/loyalty',
    views: {
      "dashboard-main": {
        controller: 'DashboardLoyaltyCtrl',
        templateUrl: 'dashboard/loyalty/loyalty.tpl.html'
      }
    },
    data:{ pageTitle: 'Loyalty' }
  });
})

.controller( 'DashboardLoyaltyCtrl', function DashboardLoyaltyCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

