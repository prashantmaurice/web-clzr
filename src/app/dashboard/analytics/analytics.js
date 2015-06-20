
angular.module( 'clozerrWeb.dashboard.analytics', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.analytics', {
    url: '/analytics',
    views: {
      "dashboard-main": {
        controller: 'DashboardAnalyticsCtrl',
        templateUrl: 'dashboard/analytics/analytics.tpl.html'
      }
    },
    data:{ pageTitle: 'Analytics' }
  });
})

.controller( 'DashboardAnalyticsCtrl', function DashboardAnalyticsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

