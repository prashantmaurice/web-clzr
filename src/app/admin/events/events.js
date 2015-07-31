
angular.module( 'clozerrWeb.admin.events', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin.events', {
    url: '/events',
    views: {
      "admin-events": {
        controller: 'AdminEventsCtrl',
        templateUrl: 'admin/events/events.tpl.html'
      }
    },
    data:{ pageTitle: 'Events Terminal' }
  });
})

.controller( 'AdminEventsCtrl', function AdminEventsCtrl( $scope, api, utils ) {
    $scope.events = [];

    
    var socket = io();
    socket.on('analytics',function(signal) {
        console.log( "Event received: " + signal );
        var analytics = JSON.parse(signal);
        $scope.update( analytics.event_id );
    });

    $scope.update = function( analytics_id ){
        api.events.get( access_token, analytics_id ).then(function(data){
            /*angular.forEach(data, function(obj){
                if (obj.auth_type == 'facebook'){
                    obj.pic = "https://graph.facebook.com/" + obj.social_id + "/picture?type=small";
                } else if (obj.auth_type == 'google') {
                    obj.pic = obj.profile.picture;
                }
            });*/

            $scope.events.push( data );

        });
    };
})

;

