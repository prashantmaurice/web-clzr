/**
 * Created by shahidh on 30/6/15.
 * directives.js
 * Contains commonly used directives used all over the app
 */


angular.module('clozerrWeb')

/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    };
}])

.directive('convertToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                if (val % 1 === 0){
                    return parseInt(val, 10);
                } else {
                    return parseFloat(val);
                }
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
})

.directive('ngAutodisable', [ '$parse', function($parse) {

    var DISABLED = 'disabled',      // Disabled attribute
        ATTRNAME = 'ngAutodisable', // The attribute name to which we store the handlers ids
        CLICK_EVENT = 'click',
        CLICK_ATTR = 'ngClick',
        SUBMIT_EVENT = 'submit',
        SUBMIT_ATTR = 'ngSubmit',
        LOADING_CLASS_ATTR = 'ngAutodisableClass';

    /**
     * Validates if the given promise is really a promise that we can use.
     * Out promises must have at least `then` and `finally` functions
     *
     * @param {Object} promise promise to test
     * @return {Boolean} true if its a promise, otherwise false
     */
    function isPromise(promise) {
        return promise                          &&
            angular.isFunction(promise.then) &&
            angular.isFunction(promise['finally']);
    }

    /**
     * Trigger the defined handler.
     *
     * @param {Object} scope scope of the element
     * @param {Object} attrs attributes
     * @param {Function} fn function to trigger
     */
    function triggerHandler(handler, scope, fn) {
        var result = fn(scope, { $event : handler.eventName });

        // If the function result happens to be a promise
        // then handle the `disabled` state of the element.
        // registers the result handler as an attribute
        if (isPromise(result)) {
            handler.handlePromise(result);
        }
    }

    /**
     * The link function for this directive.
     * Contains a prepended function that represents the ngClick handler.
     *
     * @param {Array} handlers array of click handler
     * @param {Object} scope scope
     * @param {Angular Element} element directive element
     * @param {Object} attrs attributes
     */
    function linkFn(handler, scope, element, attrs) {

        // Remove the click handler and replace it with our new one
        // with this move we completely disable the original ngClick functionality
        element.unbind(handler.eventName).bind(handler.eventName, function() {
            // Make sure we run the $digest cycle
            scope.$apply(function() {
                handler.callbacks.forEach(triggerHandler.bind(null, handler, scope));
            });
        });
    }

    function getCallbacks(expression) {
        return expression.split(';').map(function(callback) {
            return $parse(callback, /* interceptorFn */ null, /* expensiveChecks */ true);
        });
    }

    function getLoadingClass(attrs) {
        return attrs.hasOwnProperty(LOADING_CLASS_ATTR) ? attrs[LOADING_CLASS_ATTR] : false;
    }


    /**
     * Returns a new instance that can handle the promises returned by the callbacks.
     * It will disable the given element when the first promise is triggered. And will
     * re-enable the element, when the last promise is finished.
     *
     * @param  {Element} elementToDisable     DOM element that should be enabled and disabled.
     * @param  {String} eventName             Name of the event ('click' or 'submit')
     * @param  {String|Boolean} loadingClass  Class(es) to toggle to the element or false not disired.
     * @param  {Array} callbacks              Array of callback functions to trigger.
     * @return {Object}                       Object that handles the promises.
     */
    function handlerInstance(elementToDisable, eventName, loadingClass, callbacks) {
        var instance = {},
            promisesTriggered = 0;

        instance.eventName = eventName;
        instance.callbacks = callbacks;

        /**
         * This should be called everytime a callback returns a promise.
         *
         * Disables the element for the first promise. And re-enables it when
         * the last promise is done.
         *
         * @param  {Promise} promise promise returned by a callback.
         */
        instance.handlePromise = function(promise) {
            if (promisesTriggered === 0) {
                disableElement();
            }
            promisesTriggered++;

            promise['finally'](function() {
                promiseDone();
            });
        };

        /**
         * This is called every time a promise is done.
         *
         * Re-enables the element when the last promise is done.
         */
        function promiseDone() {
            promisesTriggered--;
            if (promisesTriggered === 0) {
                enableElement();
            }
        }

        /**
         * Disables the element. It can also add the classes listed by
         * loadingClass.
         */
        function disableElement() {
            elementToDisable.attr(DISABLED, true);
            if (loadingClass) {
                elementToDisable.addClass(loadingClass);
            }
        }

        /**
         * Enables the element. It can also remove the classes listed by
         * loadingClass.
         */
        function enableElement() {
            elementToDisable.attr(DISABLED, false);
            if (loadingClass) {
                elementToDisable.removeClass(loadingClass);
            }
        }

        return instance;
    }

    return {
        restrict : 'A',
        compile  : function(element, attrs) {
            var handler;

            if( attrs.hasOwnProperty(CLICK_ATTR) ) {
                handler = handlerInstance(element,
                    CLICK_EVENT,
                    getLoadingClass(attrs),
                    getCallbacks(attrs[CLICK_ATTR]));
            } else  if ( attrs.hasOwnProperty(SUBMIT_ATTR) ) {
                handler = handlerInstance(element.find('button[type=submit]'),
                    SUBMIT_EVENT,
                    getLoadingClass(attrs),
                    getCallbacks(attrs[SUBMIT_ATTR]));
            } else {
                throw new Error('ngAutodisable requires ngClick or ngSubmit attribute in order to work');
            }

            return linkFn.bind(null, handler);
        }
    };
}])

.directive('ngAutocomplete', function() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?'
            },

            link: function(scope, element, attrs, controller) {

                //options for autocomplete
                var opts;
                var watchEnter = false;
                //convert options provided to opts
                var initOpts = function() {

                    opts = {};
                    if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false;
                        } else {
                            watchEnter = true;
                        }

                        if (scope.options.types) {
                            opts.types = [];
                            opts.types.push(scope.options.types);
                            scope.gPlace.setTypes(opts.types);
                        } else {
                            scope.gPlace.setTypes([]);
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds;
                            scope.gPlace.setBounds(opts.bounds);
                        } else {
                            scope.gPlace.setBounds(null);
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            };
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
                        } else {
                            scope.gPlace.setComponentRestrictions(null);
                        }
                    }
                };

                if (scope.gPlace === undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {

                            scope.$apply(function() {

                                scope.details = result;

                                controller.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result);
                            }
                        }
                    }
                });

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0){
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if(list == null || list.length === 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        {'reference': list[0].reference},
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout');
                                                    });

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                };

                controller.$render = function () {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options;
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts();
                }, true);

            }
        };
    })

;