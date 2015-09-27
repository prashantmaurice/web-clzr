
angular.module( 'clozerrWeb.dashboard.feedback', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.feedback', {
    url: '/reviews',
    views: {
      "dashboard-main": {
        controller: 'DashboardFeedbackCtrl',
        templateUrl: 'dashboard/review/review.tpl.html'
      }
    },
    data:{ pageTitle: 'Feedback' }
  });
})

.controller( 'DashboardFeedbackCtrl', function DashboardFeedbackCtrl( $scope, api, utils, Notification, $modal ) {
      var pendingChanges = false;

        $scope.questions = [];

      function loadQuestions () {
        api.vendor.details(utils.profile.vendor_id).then(function(data){
		if( data.settings.feedback && data.settings.feedback.questions ){
			$scope.questions = data.settings.feedback.questions;
		}
		else{
			$scope.questions = [];
		}
	});
      }
      loadQuestions();

      $scope.addQuestion = function () {
        $scope.questions.push('');
          pendingChanges = true;
      };
        $scope.deleteQuestion = function (index) {
            pendingChanges = true;
            console.log( $scope.questions );
		$scope.questions.splice(index, 1);
        };

        $scope.saveQuestions = function () {
            var data = {
                settings: { feedback: { questions: $scope.questions, params:{} } }
            };
            api.vendor.edit(utils.token, utils.profile.vendor_id, data).then(function(res){
                $scope.questions = res.settings.feedback.questions;
                pendingChanges = false;
                Notification.success('Saved !');
            });
        };

        $scope.$on('$stateChangeStart', function( event ) {
            if (pendingChanges){
                var answer = confirm("Unsaved changes. Are you sure you want to discard the changes?");
                if (!answer) {
                    event.preventDefault();
                }
            }

        });

        $scope.reply = function (feedback) {
            var offerModal = $modal.open({
                templateUrl: 'dashboard/feedback/replyToFeedback.tpl.html',
                controller: 'ReplyToFeedbackModalCtrl',
                scope: $scope,
                resolve: {
                    data: function(){

                    }
                }
            });
        };
        $scope.getNumber = function(num) {
            return new Array(num);
        };
        $scope.reviews = [];
        api.vendor.feedback(utils.token, utils.profile.vendor_id).then(function(data){
            $scope.reviews = data;
        });

})

.controller('ReplyToFeedbackModalCtrl', function($scope, $modalInstance, data){
        $scope.ok = function () {
            $modalInstance.close('aa');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
;

