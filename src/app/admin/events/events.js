
angular.module( 'clozerrWeb.admin.events', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin.events', {
    url: '/events',
    views: {
      "admin-main": {
        controller: 'AdminEventsCtrl',
        templateUrl: 'admin/events/events.tpl.html'
      }
    },
    data:{ pageTitle: 'Events Terminal' }
  });
})

.controller( 'AdminEventsCtrl', function AdminEventsCtrl( $scope, api, utils ) {
	console.log('Admin events controller');
    $scope.events = [];
	$scope.startListen = function(){
	
			console.log("Setting events listener");    
			var socket = io.connect('http://api.clozerr.com');
			socket.on('analytics',function(signal) {
				console.log( "Event received: " + signal );
				var analytics = JSON.parse(signal);
				$scope.update( analytics.event_id );
			});
	};
	/*$scope.$on('$viewContentLoaded', function() {
		console.log("on view context loaded.");
		$scope.startListen();
	});*/

	$scope.$on('$stateChangeSuccess', function() {
		console.log("on state changed..");
		$scope.startListen();
	});
    $scope.update = function( analytics_id ){
        api.events.getByID( utils.token, analytics_id ).then(function(data){
            /*angular.forEach(data, function(obj){
                if (obj.auth_type == 'facebook'){
                    obj.pic = "https://graph.facebook.com/" + obj.social_id + "/picture?type=small";
                } else if (obj.auth_type == 'google') {
                    obj.pic = obj.profile.picture;
                }
            });*/

			console.log( data );
            $scope.events.push( data.data );

        });
    };
	$scope.startListen();
})

;

