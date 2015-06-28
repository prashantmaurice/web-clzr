angular.module( 'clozerrWeb', [
  'templates-app',
  'templates-common',
  'LocalForageModule',
  'clozerrWeb.about',
  'clozerrWeb.dashboard',
  'clozerrWeb.login',
  'clozerrWeb.logout',
  'clozerrWeb.api',
  'clozerrWeb.utils',
  'ui.router',
  'angular-loading-bar',
  'ui-notification'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | clozerr' ;
    }
    $scope.dashboardPageHeading = toState.data.pageTitle;
  });
})

;

