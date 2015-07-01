/**
 * Created by shahidh on 28/6/15.
 * utils.js
 * Contains all utility and helper functions used
 * all over the app.
 */

angular.module('clozerrWeb.utils', [])
    .factory('utils',  function ($state, $q, $localForage, Notification, $rootScope, api) {

        var utils = {};

        utils.token = '';
        utils.profile = {};

        /**
         * Login helper function. Access the login api from 'api' factory
         * and sets the token based on the response. Whole system works on
         * promises. After obtaining the token, profile is also fetched using api
         * and saved in localStorage, and also made available as variables
         * in utils { token , profile }
         * @param username
         * @param password
         * @returns {promise}
         */
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
                Notification.success('Welcome back ' + profile.username + ' !');
                utils.profile = profile;
                return deferred.resolve(profile);
            }, function (error){
                Notification.error(error);
                return $q.reject(false);
            });
            return deferred.promise;
        };

        /**
         * Logout helper function
         * Clears the localStorage and call the logout api to delete
         * server token.
         */
        utils.logout = function () {
            $localForage.clear().then(function(){
                return api.auth.logout(utils.token);
            }).then(function(result){
                Notification.success('See you soon !');
                $state.go('login');
            }, function(error){
                Notification.error(error);
            });
        };

        /**
         * Helper function that checks for logged in status.
         * Fetch the token and profile from localStorage and sets utils variables.
         * If token is not available in localStorage, returns login page
         * @returns {*}
         */
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