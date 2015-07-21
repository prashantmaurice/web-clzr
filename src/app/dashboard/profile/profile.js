
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
            });
        }

      api.vendor.details(utils.profile.vendor_id).then(function(data){
          console.log("vendor", data);
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



        $scope.iconPolicy = {};
        $scope.appPolicy = {};
        api.vendor.upload(utils.token, '').then(function(data){
            $scope.appPolicy = data;
            $scope.appLink = "https://clozerr.s3.amazonaws.com/" + data.key;
        });
        api.vendor.upload(utils.token, 'logo').then(function(data){
            $scope.iconPolicy = data;
            $scope.iconLink = "https://clozerr.s3.amazonaws.com/" + data.key;
        });

        $scope.upload = function (files, policy) {
            if (files && files.length) {

                    var file = files[0];
                    Upload.upload({
                        url: 'https://clozerr.s3.amazonaws.com/', //S3 upload url including bucket name
                        method: 'POST',
                        fields : {
                            "Content-Length": file.size,
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
                        console.log('progress: ' + progressPercentage + '% ' +
                            evt.config.file.name + '\n');
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                            Notification.success("Image uploaded");
                            console.log('file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n');
                        });
                    }).error(function(error){
                        console.log(error);
                        Notification.error("Upload failed. Please try again.");
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

                        if ( 2*h != w) {
                            $scope.app = [];
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

