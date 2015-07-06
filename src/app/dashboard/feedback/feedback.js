
angular.module( 'clozerrWeb.dashboard.feedback', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.feedback', {
    url: '/feedback',
    views: {
      "dashboard-main": {
        controller: 'DashboardFeedbackCtrl',
        templateUrl: 'dashboard/feedback/feedback.tpl.html'
      }
    },
    data:{ pageTitle: 'Feedback' }
  });
})

.controller( 'DashboardFeedbackCtrl', function DashboardFeedbackCtrl( $scope ) {
  // This is simple a demo for UI Boostrap. 
})

;

