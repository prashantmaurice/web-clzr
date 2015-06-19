angular.module( 'clozerrWeb', [
  'templates-app',
  'templates-common',
  'clozerrWeb.about',
  'clozerrWeb.dashboard',
  'ui.router',
  'ngMaterial'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | clozerrWeb' ;
    }
  });
})

;

