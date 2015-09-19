
angular.module( 'clozerrWeb.admin.geofencing', [
  'ui.router',
  'placeholders',
  'chart.js',
  'ngMap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin.geofencing', {
    url: '/geofencing',
    views: {
      "admin-main": {
        controller: 'AdminGeofencingCtrl',
        templateUrl: 'admin/geofencing/geofencing.tpl.html'
      }
    },
    data:{ pageTitle: 'Geofencing Terminal' }
  });
})

.controller( 'AdminGeofencingCtrl', function AdminGeofencingCtrl( $scope, api, utils, Notification ) {
	
	var map;
	console.log('Admin geofencing controller');
	$scope.curr_location = [13.079445, 80.269357];
	$scope.update = function( curr_location ){
		console.log( curr_location );
		//if( !curr_location[0] ){
		//	return;	
		//}
		api.geofencing.get( utils.token, curr_location.G, curr_location.K ).then(function(data){
			$scope.geofences = data.data;
		});
		api.vendors.near( utils.token, curr_location.G, curr_location.K ).then( function( data ){
			$scope.vendors = data.data;
			$scope.vendors.forEach( function( vendor ){
				vendor.has_geofence = vendor.geofences && vendor.geofences.length;
			});
		});
	};
	
	$scope.$on('mapInitialized', function(evt, evtMap) {
		map = evtMap;
		//marker = map.markers[0];
		$scope.update( map.getCenter() );
	});

	$scope.createGeofence = function( vendor ){
		api.vendors.geofenceCreate( utils.token, vendor._id ).then( function( data ){ 
			Notification.success('Created!');
			$scope.update( map.getCenter() );	
		});
	};
	$scope.centerVendor = function( vendor ){
		map.panTo( vendor.location );
	};
	$scope.onDrag = function( evt, evtMap ){
		$scope.update( map.getCenter() );
	};
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	
})

;

