
angular.module( 'clozerrWeb.dashboard.campaigns', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.campaigns', {
    url: '/campaigns',
    views: {
      "dashboard-main": {
        controller: 'DashboardCampaignsCtrl',
        templateUrl: 'dashboard/campaigns/campaigns.tpl.html'
      }
    },
    data:{ pageTitle: 'Campaigns' }
  });
})

.controller( 'DashboardCampaignsCtrl', function DashboardCampaignsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

