
angular.module( 'clozerrWeb.dashboard.rewards', [
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard.rewards', {
    url: '/rewards',
    views: {
      "dashboard-main": {
        controller: 'DashboardRewardsCtrl',
        templateUrl: 'dashboard/rewards/rewards.tpl.html'
      }
    },
    data:{ pageTitle: 'Rewards' }
  });
})

.controller( 'DashboardRewardsCtrl', function DashboardRewardsCtrl( $scope, api, utils, Notification ) {
  // This is simple a demo for UI Boostrap.
  function initRewards(){ 
  $scope.rewards = {
    welcomeReward : {
      type: "S0",
      caption: "Welcome Reward",
      description: "",
      params: {
        type: "welcomeReward",
        expiry: ""
      }
    },
    happyHour : {
      type: "S0",
      caption: "Happy Hour Reward",
      description: "",
      params: {
        type: "happyHour",
        startHour: 10,
        endHour: 12,
        days: []
      }
    },
    facebookCheckIn : {
      type: "S0",
      caption: "Facebook Check-in Reward",
      description: "",
      params: {
        type: "facebookCheckIn",
        expiry: ""
      }
    },
    facebookReferral : {
      type: "S0",
      caption: "Facebook Referral Reward",
      description: "",
      params: {
        type: "facebookReferral",
        expiry: ""
      }
    },
    luckyCheckIn : {
      type: "S0",
      caption: "Lucky Check-in Reward",
      description: "",
      params: {
        type: "luckyCheckIn",
        frequency: "",
        expiry: ""
      }
    },
    limitedTime: {
      type: "S0",
      caption: "Limited Time Offer",
      description: "",
      params: {
        type: "limitedTime",
        startDateTime: new Date(),
        endDateTime: new Date()
      }
    },
    limitedCustomer: {
      type: "S0",
      caption: "Limited Customers Offer",
      description: "",
      params: {
        type: "limitedCustomer",
        maxCustomers: 0
      }
    }
  };
	}

	initRewards();
  $scope.days = {0:false,1:false,2:false,3:false,4:false,5:false,6:false};
  function processDays () {
    var days = [];
    angular.forEach($scope.days, function(val, day){
      if (val){
        days.push(parseInt(day,10));
      }
    });
    $scope.rewards.happyHour.params.days = days;
  }
  function renderDays () {
    var days = $scope.rewards.happyHour.params.days;
    for (var i in days){
      $scope.days[days[i]] = true;
    }
  }

  function loadS0Offers () {
	
    api.offer.all(utils.profile.vendor_id).then(function (offers) {
      initRewards();
	angular.forEach(offers, function (offer) {
        if (offer.type == "S0") {
          if(offer.params){
            $scope.rewards[offer.params.type] = offer;
          }
        }
      });
      renderDays();
    });
  }
  loadS0Offers();

  $scope.saveReward = function (reward) {
    processDays();
	console.log( reward );

	$scope.waitingForServer = true;
    if (reward._id) {
      //Edit reward
      var id = reward._id;
      delete(reward._id);
      delete(reward.__v);
	
      api.offer.edit(utils.token, id, reward).then(function(resp){
        Notification.success('Reward saved !');
        loadS0Offers();
	$scope.waitingForServer = false;
      }, function(error){
        Notification.error(error);
        console.log(error);
	$scope.waitingForServer = false;
      });
    } else {
      //Create reward
      api.offer.create(utils.token, reward).then(function (result) {
        return api.offer.addToVendor(utils.token, utils.profile.vendor_id, result._id);
      }).then(function(result){
        Notification.success('Reward saved!');
        console.log(result);
	loadS0Offers();
	$scope.waitingForServer = false;
      }, function(error){
        Notification.error(error);
        console.log(error);
	$scope.waitingForServer = false;
      });
    }
  };

  $scope.deleteReward = function (reward){
	console.log("deleting");
	console.log( reward );
	if( !reward._id ){
		return;
	}
	
	api.offer.deleteFromVendor( utils.token, utils.profile.vendor_id, reward._id ).then( function(resp){
		Notification.success('Reward saved!');
		console.log(resp);
		loadS0Offers();
		$scope.waitingForServer = false;
	}, function( error ){
		Notification.error(error);
		console.log(error);
		$scope.waitingForServer = false;
	});
  };

  $scope.openCalendar = function(e, date) {
    e.preventDefault();
    e.stopPropagation();

    $scope.calUIOpen[date] = true;
  };

  $scope.calUIOpen = {
    date1: false,
    date2: false
  };




})

;

