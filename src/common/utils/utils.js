/**
 * Created by shahidh on 28/6/15.
 */

angular.module('clozerrWeb.utils', [])
    .factory('utils',  function ($state, $q, $localForage, Notification, $rootScope, api) {

        var utils = {};

        utils.token = '';
        utils.profile = {};

        utils.login = function (username, password) {
            var deferred = $q.defer();

            api.auth.login(username, password).then(function(token){
                return $localForage.setItem('token', token);
            }).then(function(token){
                utils.token = token;
                return api.auth.profile(token);
            }).then(function(profile){
                 return $localForage.setItem('profile', profile);
            }).then(function(profile){
                Notification.success('Login success!');
                utils.profile = profile;
                return deferred.resolve(profile);
            }, function (error){
                Notification.error(error);
                return $q.reject(false);
            });
            return deferred.promise;
        };

        utils.logout = function () {
            var deferred = $q.defer();
            $localForage.clear().then(function(){
                return api.auth.logout(utils.token);
            }).then(function(result){
                Notification.success('Logged out!');
                $state.go('login');
            }, function(error){
                Notification.error(error);
            });
        };

        utils.isLoggedIn = function () {
            var deferred = $q.defer();
            $localForage.getItem('token').then(function(token){
                if(token){
                    utils.token = token;
                    return $localForage.getItem('profile');
                } else {
                    return $q.reject('Token not found');
                }
            }).then(function(profile){
                if(profile){
                    utils.profile = profile;
                    return deferred.resolve(true);
                } else {
                    return $q.reject('Profile not found');
                }
            }, function (error){
                Notification.error('Please log in to access this page!');
                $state.go('login');
                return $q.reject(false);
            });
            return deferred.promise;
        };

        return utils;
    });

