/**
 * Created by shahidh on 28/6/15.
 */

angular.module('clozerrWeb.utils', [])
    .factory('utils', ['$state', '$q', '$localForage', 'Notification', function ($state, $q, $localForage, Notification) {

        var utils = {};
        // Checks if a use is logged in or not
        utils.isLoggedIn = function () {
            var deferred = $q.defer();
            $localForage.getItem('profile').then(function (profile) {
                if(profile != null){
                    console.log('logged in');
                    deferred.resolve();
                } else {
                    deferred.reject();
                    Notification.warning('Please login to access this page!');
                    $state.go('login');
                }
            });
        };
        // Get user profile details
        utils.user = function () {
            return $localForage.getItem('profile');
        };
        return utils;
    }]);