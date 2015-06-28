
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

.controller( 'DashboardLoyaltyCtrl', function DashboardLoyaltyCtrl( $scope, $modal ) {
  $scope.addNewOffer = function () {
    $modal.open({
      templateUrl: 'dashboard/loyalty/newOfferModal.tpl.html',
      controller: 'NewOfferModalCtrl'
    });
  };
})

.controller('NewOfferModalCtrl', function NewOfferModalCtrl($scope, $modalInstance){
  console.log('NewOfferModalCtrl');
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
})
;

