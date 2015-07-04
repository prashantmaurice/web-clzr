
angular.module( 'clozerrWeb.dashboard.campaigns', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.campaigns', {
    url: '/campaigns',
    views: {
      "dashboard-main": {
        controller: 'DashboardCampaignsCtrl',
        templateUrl: 'dashboard/campaigns/campaigns.tpl.html'
      }
    },
    data:{ pageTitle: 'Campaigns' }
  });
})

.controller( 'DashboardCampaignsCtrl', function DashboardCampaignsCtrl( $scope, api, utils, Notification ) {



        $scope.campaigns = {
            birthdayWish: {
                type: "birthdayWish",
                activated: false,
                messagePrefix: "Happy Birthday! Come in and get ",
                message: ""
            },
            visitReminder: {
                type: "visitReminder",
                activated: false,
                days: 7,
                messagePrefix: "We miss you! Come in and get ",
                message: ""
            },
            neighbourhoodPerks: {
                type: "neighbourhoodPerks",
                activated: false,
                distance: 10,
                expiry: 7,
                messagePrefix: "We are now offering ",
                message: ""
            }
        };


        function loadCampaigns () {
            api.vendor.details(utils.profile.vendor_id).then(function(details){

                var campaigns = details.settings;

                angular.forEach(campaigns, function(campaign){
                    $scope.campaigns[campaign.type] = campaign;
                    $scope.campaigns[campaign.type].activated = (campaign.activated == "false") ? false : true;

                });
            });
        }
        loadCampaigns();

        $scope.saveCampaigns = function(msg) {
            var vendor ={
                settings: $scope.campaigns

            };
            api.vendor.edit(utils.token, utils.profile.vendor_id, vendor).then(function(data){
                Notification.success('Campaign ' + msg + ' !');
                loadCampaigns();
            });

        };

        $scope.toggleCampaign = function(campaign) {

            $scope.campaigns[campaign].activated = !$scope.campaigns[campaign].activated;
            var msg = $scope.campaigns[campaign].activated ? 'activated' : 'deactivated';


            $scope.saveCampaigns(msg);
        };

    $scope.oneTimeMsgType = 'reward';




})

;

