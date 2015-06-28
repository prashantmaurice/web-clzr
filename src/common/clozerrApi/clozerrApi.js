angular.module('clozerrWeb.api', [])
    .factory('api', ['$http', '$localForage', function($http, $localForage) {

    var urlBase = 'http://api.clozerr.com/';
    var api = {};
    // Login method
    api.login = function (username, password) {
        return $http.get(urlBase + 'auth/login/password/', {
            params: {
                username: username,
                password: password
            }
        });
    };
    // Get local token method
    api.getToken = function () {
        return $localForage.getItem('token');
    };
    // Set local token
    api.setToken = function (token) {
        return $localForage.setItem('token', token);
    };

    //Profile method
    api.profile = function (token) {
        return $http.get(urlBase + 'auth/profile/', {
            params: {
                access_token: token
            }
        });
    };

    return api;
}]);