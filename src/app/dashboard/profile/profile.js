
angular.module( 'clozerrWeb.dashboard.profile', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.profile', {
    url: '/profile',
    views: {
      "dashboard-main": {
        controller: 'DashboardProfileCtrl',
        templateUrl: 'dashboard/profile/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'Profile' }
  });
})

.controller( 'DashboardProfileCtrl', function DashboardProfileCtrl( $scope, api, utils, Notification ) {

      /**
       * image str
       * location Arr
       * name str
       * phone str
       * category str
       */
      $scope.location ={
          details: {}
      };
      $scope.data = {
        image: '',
        location: [],
        locationString: '',
        name: '',
        phone: '',
        category: ''
      };

        function loadData (input, output) {
            angular.forEach(output, function(val, key){
                output[key] = input[key];
                if(key == 'location'){
                    reverseGeocode(output[key]);
                }
            });
        }

      api.vendor.details(utils.profile.vendor_id).then(function(data){
        console.log(data);
        loadData(data, $scope.data);
      });

        $scope.$watch('location.details', function(newVal, oldVal){
            if(newVal.hasOwnProperty('geometry')) {
                $scope.data.location = [newVal.geometry.location.A, newVal.geometry.location.F];
            }
        });

        $scope.saveDetails = function() {
            api.vendor.edit(utils.token, utils.profile.vendor_id, $scope.data).then(function(data){
                console.log(data);
                loadData(data, $scope.data);
                Notification.success('Saved !');
            });
        };

        function reverseGeocode (location) {
            var geocoder = new google.maps.Geocoder();
            console.log('Reverse geocoding');
            console.log(location);
            var latlng = new google.maps.LatLng(location[0], location[1]);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        console.log(results);
                        console.log(results[1]);
                        console.log(results[1].formatted_address);
                    } else {
                        console.log('No results found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        }

})

;

