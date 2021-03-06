
angular.module( 'clozerrWeb.dashboard.profile', [
  'ui.router',
    'ngFileUpload'
]).config(function config( $stateProvider ) {
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
}).controller( 'DashboardProfileCtrl', function DashboardProfileCtrl( $scope, api, utils, Notification, Upload, $timeout ) {

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
        address: '',
        name: '',
        phone: '',
        category: '',
		settings:{policy:'',viewState:{placeholder:'',active:true}, stampsReset:{totalStamps:0, active:false}, checkins:{ expiry:60 * 60 * 1000 } },
		beacons:{major:0, minor:0},
		description: '',
		qrcodes:[]
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
		console.log( newVal );
		if(newVal.hasOwnProperty('geometry')) {
			$scope.data.location = [newVal.geometry.location.G, newVal.geometry.location.K];
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


		$scope.addCode = function(){
			$scope.data.qrcodes.push("");
		};

		$scope.removeCode = function( code ){
			$scope.data.qrcodes.splice( $scope.data.qrcodes.indexOf(code), 1 );
		};

        $scope.upload = function (files, policy) {
            if (files) {

                    var file = files;
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
                        console.log('progress: ' + progressPercentage + '% ');
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
                    fr.readAsDataURL(file); // I'm using a <input type="file"> for demonstrating
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
                            Notification.error("Image width must be twice the height, please try again.");
                        } else if (2*h == w) {
                            Notification.success("Click Save to upload image.");
                        }
                    };
			
                    img.src = fr.result; // is the data URL because called with readAsDataURL
                };
                if (file){
			console.log( file );
                    fr.readAsDataURL(file); // I'm using a <input type="file"> for demonstrating
                }
            }

        });
}).directive('expiryFormatter', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
     controller.$formatters.push(function(value) {
        return value / (60 * 1000);
      });
     controller.$parsers.push(function(value) {
        return value * 60 * 1000;
     });
    }
  };
});
