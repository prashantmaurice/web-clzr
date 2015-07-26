
angular.module( 'clozerrWeb.home', [
  'ui.router',
  'snapscroll'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeCtrl( $scope ) {
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

        //$scope.childSnapAnimation = false;
})

;

