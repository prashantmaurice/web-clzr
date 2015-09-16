
angular.module( 'clozerrWeb.landing', [
  'ui.router',
  'snapscroll'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'landing', {
    url: '/landing',
    views: {
      "main": {
        controller: 'LandingCtrl',
        templateUrl: 'landing/landing.tpl.html'
      }
    },
    data:{ pageTitle: 'Rewarding you at places you love! ' }
  });
})

.controller( 'LandingCtrl', function LandingCtrl( $scope ) {
        $scope.snapIndex = 0;
        $scope.childSnapIndex = 0;

      $scope.$on('arrow-up', function () {
        $scope.$apply(function () {
          $scope.snapIndex--;
        });
      });
      $scope.$on('arrow-down', function () {
        $scope.$apply(function () {
          $scope.snapIndex++;
        });
      });

      $scope.afterSnap = function (snapIndex) {
        $scope.snapAnimation = true; // turn animations on after the initial snap
        console.log(snapIndex);
      };

})

;

