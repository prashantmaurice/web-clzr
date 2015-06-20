angular.module( 'clozerrWeb', [
  'ngAnimate',
  'templates-app',
  'templates-common',
  'clozerrWeb.about',
  'clozerrWeb.dashboard',
  'ui.router',
  'anim-in-out',
  'angular-loading-bar'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | clozerrWeb' ;
    }
    $scope.dashboardPageHeading = toState.data.pageTitle;
  });
})

;

