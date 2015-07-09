
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

.controller( 'DashboardFeedbackCtrl', function DashboardFeedbackCtrl( $scope, api, utils, Notification, $modal ) {
      var pendingChanges = false;

        $scope.questions = [];

      function loadQuestions () {
        api.vendor.details(utils.profile.vendor_id).then(function(data){
          $scope.questions = data.question;
        });
      }
      loadQuestions();

      $scope.addQuestion = function () {
        $scope.questions.push('');
          pendingChanges = true;
      };
        $scope.deleteQuestion = function (index) {
            pendingChanges = true;
            $scope.questions.splice(index, 1);
        };

        $scope.saveQuestions = function () {
            var data = {
                question: $scope.questions
            };
            api.vendor.edit(utils.token, utils.profile.vendor_id, data).then(function(res){
                $scope.questions = res.question;
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
        api.vendor.reviews(utils.token, utils.profile.vendor_id).then(function(data){
        //api.vendor.reviews('4dd2cee48ddecfd9ae6e6a120d410c97', '55293297b6cd430f332841c4').then(function(data){
            $scope.reviews = data ;
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

