
angular.module( 'clozerrWeb.dashboard.profile', [
  'ui.router',
    'ngFileUpload'
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

.controller( 'DashboardProfileCtrl', function DashboardProfileCtrl( $scope, api, utils, Notification, Upload, $timeout ) {

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
                loadData(data, $scope.data);
                Notification.success('Saved !');
            });
        };

        function reverseGeocode (location) {
            //var geocoder = new google.maps.Geocoder();
            //console.log('Reverse geocoding');
            //console.log(location);
            //var latlng = new google.maps.LatLng(location[0], location[1]);
            //geocoder.geocode({'latLng': latlng}, function(results, status) {
            //    if (status == google.maps.GeocoderStatus.OK) {
            //        if (results[1]) {
            //            console.log(results);
            //            console.log(results[1]);
            //            console.log(results[1].formatted_address);
            //        } else {
            //            console.log('No results found');
            //        }
            //    } else {
            //        console.log('Geocoder failed due to: ' + status);
            //    }
            //});
        }

        var policy = {};
        api.vendor.upload(utils.token, '').then(function(data){
            console.log(data);
            policy = data;
        });

        $scope.upload = function (files) {
            if (files && files.length) {

                    var file = files[0];
                    Upload.upload({
                        url: 'https://clozerr.s3.amazonaws.com/', //S3 upload url including bucket name
                        method: 'POST',
                        fields : {
                            "Content-Type": file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                            key: policy.key, // the key to store the file on S3, could be file name or customized
                            AWSAccessKeyId: policy.access_key,
                            acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
                            policy: policy.policy, // base64-encoded json policy (see article below)
                            signature: policy.signature // base64-encoded signature based on policy string (see article below)
                        },
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);
                        $scope.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.file.name + '\n' + $scope.log;
                        console.log('progress: ' + progressPercentage + '% ' +
                            evt.config.file.name + '\n');
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                            $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                            console.log('file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n');
                        });
                    });

            }
        };

        $scope.$watch('icon', function(file){
            if (file){
                var fr = new FileReader();
                fr.onload = function () { // file is loaded
                    var img = new Image();
                    img.onload = function () {
                        var w = img.width;
                        var h = img.height;
                        console.log(w, h); // image is loaded; sizes are available

                        if (h != w) {
                            $scope.icon = [];
                            Notification.error("Image height and width must be equal, please try again.");
                        } else if (h == w) {
                            Notification.success("Click Save to upload image.");
                        }
                    };
                    img.src = fr.result; // is the data URL because called with readAsDataURL
                };
                if (file){
                    fr.readAsDataURL(file[0]); // I'm using a <input type="file"> for demonstrating
                }
            }

        });

        $scope.$watch('app', function(file){
            if (file){
                var fr = new FileReader();
                fr.onload = function () { // file is loaded
                    var img = new Image();
                    img.onload = function () {
                        var w = img.width;
                        var h = img.height;
                        console.log(w, h); // image is loaded; sizes are available

                        if (h != 2*w) {
                            $scope.icon = [];
                            Notification.error("Image height must be twice the width, please try again.");
                        } else if (h == 2*w) {
                            Notification.success("Click Save to upload image.");
                        }
                    };
                    img.src = fr.result; // is the data URL because called with readAsDataURL
                };
                if (file){
                    fr.readAsDataURL(file[0]); // I'm using a <input type="file"> for demonstrating
                }
            }

        });
})

;

