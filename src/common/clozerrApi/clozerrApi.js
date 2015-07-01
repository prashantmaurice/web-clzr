angular.module('clozerrWeb.api', [])
    .factory('api', function($http, $localForage, $q) {

        var urlBase = 'http://api.clozerr.com/';
        var api = {};

        api.auth = {
            login: function (username, password) {
                return $http.get(urlBase + 'auth/login/password/', {
                    params: {
                        username: username,
                        password: password
                    }
                }).then(function(resp){
                    if(resp.data.result === true){
                        return resp.data.access_token;
                    } else {
                        return $q.reject('Invalid username or password');
                    }
                }, function (error) {
                    return $q.reject(error);
                });
            },
            logout: function (token) {
                return $http.get(urlBase + 'auth/logout/', {
                    params: {
                        access_token: token
                    }
                }).then(function(resp){
                    if(resp.data.result === true){
                        return true;
                    } else {
                        $q.reject('Invalid token!');
                    }
                }, function(error){
                    return $q.reject('Server error, please try again!');
                });
            },
            profile: function (token) {
                return $http.get(urlBase + 'auth/profile/', {
                    params: {
                        access_token: token
                    }
                }).then(function(resp){
                    return resp.data;
                }, function(error){
                    return $q.reject('Server unreachable. Please try again!');
                });
            }
        };

        api.offer ={
            // Returns vendor details with expanded offer details
            all: function (vendor_id){
                return $http.get(urlBase + 'v2/vendor/offers/active', {
                    params: {
                        vendor_id: vendor_id
                    }
                }).then(function(resp){
                    return resp.data.offers;
                }, function(error){
                    return $q.reject(error);
                });
            },
            details: function (offer_id) {
                return $http.get(urlBase + 'v2/offer/get/details', {
                    params: {
                        offer_id: offer_id
                    }
                });
            },
            create: function (access_token, caption, description, stamps){
                /*
                 Create a new offer
                 params: access_token, caption, description, stamps
                 return: {
                 result: true,
                 data: {
                 type
                 stamps
                 caption
                 description
                 _id
                 }
                 }
                 {
                 result: false,
                 err: {
                 code: 619,
                 description: User not logged in
                 }
                 }
                 */
                return $http.get(urlBase + 'offer/create', {
                    params: {
                        access_token: access_token,
                        caption: caption,
                        description: description,
                        stamps: stamps
                    }
                }).then(function(resp){
                    if(resp.data.result){
                        return resp.data.data;
                    } else {
                        $q.reject(resp.data.err.description);
                    }
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            edit: function (access_token, offer_id, offer) {
                /*
                 Edit an offer object
                 params: access_token, offer_id, offer
                 return: {
                 vendor details
                 }
                 {
                 result: false,
                 err: {
                 code: xxx,
                 description: xxx
                 }
                 }
                 */
                console.log('params', offer);
                return $http.get(urlBase + 'v2/offer/details/set', {
                    params: {
                        offer_id: offer_id,
                        access_token: access_token,
                        offer: offer
                    },
                    paramSerializer: '$httpParamSerializerJQLike'
                }).then(function(resp){
                    console.log('API bare response:',resp);
                    return resp.data;
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            addToVendor: function (access_token, vendor_id, offer_id) {
                /*
                 Add an offer to vendor
                 params: access_token, vendor_id, offer_id
                 return: {
                 result: true,
                 }

                 {
                 result: false,
                 err: {
                 code: xxx,
                 description: xxx
                 }
                 }
                 */
                return $http.get(urlBase + 'vendor/addoffer', {
                    params: {
                        vendor_id: vendor_id,
                        offer_id: offer_id,
                        access_token: access_token
                    }
                }).then(function(resp){
                    if(resp.data.result){
                        return resp.data.result;
                    } else {
                        $q.reject(resp.data.err.description);
                    }
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            deleteFromVendor: function (access_token, vendor_id, offer_id) {
                /*
                 Delete an offer from vendor
                 params: access_token, vendor_id, offer_id
                 return: {
                 vendor details
                 }
                 {
                 result: false,
                 err: {
                 code: xxx,
                 description: xxx
                 }
                 }
                 */
                return $http.get(urlBase + 'offer/delete', {
                    params: {
                        vendor_id: vendor_id,
                        offer_id: offer_id,
                        access_token: access_token
                    }
                }).then(function(resp){
                    return resp.data;
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            }
        };


        api.vendorDetails = function (vendor_id) {
            return $http.get(urlBase + 'v2/vendor/get/details', {
                params: {
                    vendor_id: vendor_id
                }
            });
        };

        return api;
});