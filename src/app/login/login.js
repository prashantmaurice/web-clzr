
angular.module( 'clozerrWeb.login', [
  'ui.router',
  'clozerrWeb.api',
  'placeholders',
   'ui-notification'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $scope, $state, api, Notification, $localForage, $rootScope ) {
        $scope.signIn = function () {
            // Call the login api
            api.login($scope.username, $scope.password).success(function (data) {
                // Check if login is successful
                if (data.result === true) {
                    // Save the token
                    api.setToken(data.access_token).then(function () {
                        // Get the profile
                        api.profile(data.access_token).success(function (profile) {
                            if(profile.vendor_id){ // Check if he is a vendor
                                $localForage.setItem('profile', profile).then(function(){
                                    $rootScope.user = profile;
                                    Notification.success('Login successful!'); // Show success msg
                                    $state.go('dashboard.home'); // Goto home
                                });
                            } else {
                                Notification.error('You are not a vendor');
                            }
                        });
                    });
                } else {
                    Notification.error('Invalid username or password');
                }
            })
            .error(function (error) {
                console.log('error', error);
                Notification.error('Some error occurred. Please try again!');
            });

        };
})

;

