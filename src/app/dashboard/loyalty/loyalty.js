
angular.module( 'clozerrWeb.dashboard.loyalty', [
  'ui.router'
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

.controller( 'DashboardLoyaltyCtrl', function DashboardLoyaltyCtrl( $scope, $modal, $rootScope, api, utils, Notification ) {

      function loadS1Offers () {
          api.offer.all(utils.profile.vendor_id).then(function(offers){
              var s1Offers = [];
              for (var i in offers){
                  offers[i].stamps = parseInt(offers[i].stamps, 10);
                  if (offers[i].type == "S1") {
                      s1Offers.push(offers[i]);
                  }
              }
              $scope.offers = s1Offers;
          });
      }
      loadS1Offers();

      $scope.editOffer = function (id) {
        var offerModal = $modal.open({
          templateUrl: 'dashboard/loyalty/newOfferModal.tpl.html',
          controller: 'NewOfferModalCtrl',
          scope: $scope,
          resolve: {
            offer: function(){
              for (var i in $scope.offers){
                if ($scope.offers[i]._id == id) {
                  return $scope.offers[i];
                }
              }
              return {};
            }
          }
        });

        offerModal.result.then(function(res){
          // Reload offers
          console.log(res);
          loadS1Offers();
        });
      };

      $scope.deleteOffer = function (id) {
        api.offer.deleteFromVendor(utils.token,utils.profile.vendor_id, id).then(function(result){
          Notification.warning('Offer deleted!');
          loadS1Offers();
        }, function (error) {
          console.log(error);
          Notification.error(error);
        });
      };

})

.controller('NewOfferModalCtrl', function NewOfferModalCtrl($scope, $modalInstance, offer, api, utils,  Notification){
      $scope.offer = offer;
      $scope.ok = function () {
        if($scope.offer._id){
          // Edit offer
            console.log('before API:',$scope.offer);
            var id = $scope.offer._id;

            api.offer.edit(utils.token, id, $scope.offer).then(function(resp){
                console.log('API resp:',resp);
                Notification.success('Offer details changed');
                $modalInstance.close(resp);
            }, function(error){
                Notification.error(error);
                console.log(error);
            });
        } else {
          // Add new offer
          api.offer.create(utils.token, offer.caption, offer.description, offer.stamps).then(function(result){
            Notification.success('New offer created!');
            return api.offer.addToVendor(utils.token, utils.profile.vendor_id, result._id);
          }).then(function(result){
            $modalInstance.close(result);
          }, function(error){
            Notification.error(error);
            console.log(error);
          });
        }

      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
})
;