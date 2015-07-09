
angular.module( 'clozerrWeb.dashboard.clubmembers', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.clubmembers', {
    url: '/clubmembers',
    views: {
      "dashboard-main": {
        controller: 'DashboardClubmembersCtrl',
        templateUrl: 'dashboard/clubmembers/clubmembers.tpl.html'
      }
    },
    data:{ pageTitle: 'Clubmembers' }
  });
})

.controller( 'DashboardClubmembersCtrl', function DashboardClubmembersCtrl( $scope, api, utils ) {
      $scope.users = [];
    api.vendor.clubmembers(utils.token).then(function(data){
      angular.forEach(data, function(obj){
        if (obj.auth_type == 'facebook'){
          obj.pic = "https://graph.facebook.com/" + obj.social_id + "/picture?type=small";
        } else if (obj.auth_type == 'google') {
          obj.pic = obj.profile.picture;
        }
      });
      $scope.users = data;

    });
})

;

