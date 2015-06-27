angular.module( 'clozerrWeb', [
  'templates-app',
  'templates-common',
  'clozerrWeb.about',
  'clozerrWeb.dashboard',
  'ui.router',
  'angular-loading-bar'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | clozerrWeb' ;
    }
    $scope.dashboardPageHeading = toState.data.pageTitle;
  });
})

;

