angular.module( 'clozerrWeb', [
  'templates-app',
  'templates-common',
  'LocalForageModule',
  'clozerrWeb.about',
  'clozerrWeb.dashboard',
  'clozerrWeb.admin',
  'clozerrWeb.home',
  'clozerrWeb.login',
  'clozerrWeb.logout',
  'clozerrWeb.api',
  'clozerrWeb.utils',
  'ui.router',
  'angular-loading-bar',
  'ui-notification'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.run( function run ($rootScope, utils, $state) {

})

.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      vendor: 'vendor',
      guest: 'guest'
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

