/**
 * Created by shahidh on 28/6/15.
 * clozerrApi.js
 * Contains all web-API accessing functions
 */

angular.module('clozerrWeb.api', [])
    .factory('api', function($http, $localForage, $q) {

        var urlBase = 'http://api.clozerr.com/';
        var api = {};

        /**
         * Auth object
         * @type {{login: Function, logout: Function, profile: Function}}
         */
        api.auth = {
            /**
             * Login api using promises
             * @param username
             * @param password
             * @returns {access_token}
             */
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
            /**
             * Logout api
             * @param token
             * @returns {*}
             */
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
            /**
             * Profile api
             * @param token
             * @returns {*}
             */
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

        /**
         * Offer object
         * @type {{all: Function, details: Function, create: Function, edit: Function, addToVendor: Function, deleteFromVendor: Function}}
         */
        api.offer ={
            /**
             * Get all offers with expanded details
             * @param vendor_id
             * @returns {offers}, err: {Promise}
             */
            all: function (vendor_id){
                return $http.get(urlBase + 'v2/vendor/offers/active', {
                    params: {
                        vendor_id: vendor_id
                    }
                }).then(function(resp){
                    return resp.data.offers_filled;
                }, function(error){
                    return $q.reject(error);
                });
            },
            /**
             * Get details of a specific offer
             * @param offer_id
             * @returns {HttpPromise}
             */
            details: function (offer_id) {
                return $http.get(urlBase + 'v2/offer/get/details', {
                    params: {
                        offer_id: offer_id
                    }
                });
            },
            /**
             * Create a new offer
             * @param access_token
             * @param offer
             * @returns {offer}
             */
            create: function (access_token, offer){
				
				return $http.get(urlBase + 'offer/create', {
                    params: {
                        access_token: access_token,
                        caption: offer.caption,
                        description: offer.description,
                        stamps: offer.stamps || "",
                        type: offer.type,
                        params: offer.params
                    }
                    //paramSerializer: '$httpParamSerializerJQLike'
					
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
            /**
             * Edit an existing offer
             * @param access_token
             * @param offer_id
             * @param offer
             * @returns {offer}
             */
            edit: function (access_token, offer_id, offer) {
                return $http.get(urlBase + 'v2/offer/details/set', {
                    params: {
                        offer_id: offer_id,
                        access_token: access_token,
                        offer: offer
                    },
                    paramSerializer: '$httpParamSerializerJQLike'
                }).then(function(resp){
                    return resp.data;
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            /**
             * Add an offer to vendor
             * @param access_token
             * @param vendor_id
             * @param offer_id
             * @returns {true}
             */
            addToVendor: function (access_token, vendor_id, offer_id) {
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
            /**
             * Delete an offer from a vendor
             * @param access_token
             * @param vendor_id
             * @param offer_id
             * @returns {*}
             */
            deleteFromVendor: function (access_token, vendor_id, offer_id) {
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

        /**
         * Vendor object
         * @type {{details: Function, edit: Function}}
         */
        api.vendor = {
            /**
             * Fetch vendor details
             * @param vendor_id
             * @returns data object on success, else reject
             */
            details: function (vendor_id){
                return $http.get(urlBase + 'v2/vendor/get/details', {
                    params: {
                        vendor_id: vendor_id
                    }
                }).then(function(resp){
                    return resp.data;
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            /**
             * Method to edit a field in vendor details object
             * @param access_token
             * @param vendor_id
             * @param vendor
             * @returns {*}
             */
            edit: function (access_token, vendor_id, vendor) {
                return $http.get(urlBase + 'v2/vendor/details/patch', {
                    params: {
                        vendor_id: vendor_id,
                        access_token: access_token,
                        data: JSON.stringify( vendor )
                    }
                    //paramSerializer: '$httpParamSerializerJQLike'
                }).then(function(resp){
                    return resp.data;
                }, function(error){
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            /**
             * Get the details of club members
             * @param access_token
             * @returns {*}
             */
            clubmembers: function(access_token) {
                return $http.get(urlBase + 'v2/vendor/club/get', {
                    params: {
                        access_token: access_token
                    }
                }).then(function (resp){
                    return resp.data;
                }, function (error) {
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            /**
             * Fetch all reviews about a vendor
             * @param access_token
             * @param vendor_id
             * @returns {*}
             */
            reviews: function (access_token, vendor_id) {
                return $http.get(urlBase + 'v2/vendor/review/all', {
                    params: {
                        access_token: access_token,
                        vendor_id: vendor_id
                    }
                }).then(function (resp){
                    return resp.data;
                }, function (error) {
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            },
            /**
             * S3 Upload parameters
             * @param access_token
             * @param ext
             * @returns {*}
             */
            upload: function(access_token, ext) {
                return $http.get(urlBase + 'vendor/upload-policy', {
                    params: {
                        access_token: access_token,
                        ext: ext
                    }
                }).then(function (resp){
                    return resp.data;
                }, function (error) {
                    console.log(error);
                    return $q.reject('Server unreachable. Please try again!');
                });
            }
        };



        return api;
});
