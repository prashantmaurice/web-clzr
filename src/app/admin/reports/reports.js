
angular.module( 'clozerrWeb.admin.reports', [
  'ui.router',
  'placeholders',
  'chart.js'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin.reports', {
    url: '/reports',
    views: {
      "admin-main": {
        controller: 'AdminReportsCtrl',
        templateUrl: 'admin/reports/reports.tpl.html'
      }
    },
    data:{ pageTitle: 'Reports Terminal' }
  });
})

.controller( 'AdminReportsCtrl', function AdminReportsCtrl( $scope, api, utils ) {
	console.log('Admin reports controller');
	$scope.update = function( analytics_id ){
		api.reports.get( utils.token ).then(function(data){

			console.log( data );
			$scope.install_labels = data.data.r2d.installs.map(function( item ){
				var date = new Date( item._id.time );
				return date.getDate() + "/" + (date.getMonth() + 1);
			});
			$scope.install_series = ['Installs'];

			var dat = data.data.r2d.installs.map(function( item ){
				return parseInt( item.value, 10 );
			});
			$scope.install_data = [dat];
			
			$scope.views_labels = data.data.r2d.app_views.map(function( item ){
				var date = new Date( item._id.time );
				return date.getDate() + "/" + (date.getMonth() + 1);
			});
			$scope.views_series = ['App Views'];


			var dat2 = data.data.r2d.app_views.map(function( item ){
				return parseInt( item.value, 10 );
			});
			$scope.views_data = [dat2];
			

			$scope.active_labels = data.data.r2d.active_users.map(function( item ){
				var date = new Date( item._id.time );
				return date.getDate() + "/" + (date.getMonth() + 1);
			});
			$scope.active_series = ['Active Users'];


			var dat3 = data.data.r2d.active_users.map(function( item ){
				return parseInt( item.value, 10 );
			});
			$scope.active_data = [dat3];
			//$scope.reports.push( data.data );
			//$scope.mapReports();
		});
		//$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		//$scope.series = ['Series A', 'Series B'];
		//$scope.data = [
		//	[65, 59, 80, 81, 56, 55, 40],
		//	[28, 48, 40, 19, 86, 27, 90]
		//];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
	};
	$scope.update();
	//$scope.startListen();
})

;

