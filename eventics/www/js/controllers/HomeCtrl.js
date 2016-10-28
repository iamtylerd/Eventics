app.controller('HomeCtrl', function($ionicModal, $scope, $http, $rootScope, $location, hostedServer, userFactory, $cordovaFileTransfer, eventFactory) {

eventFactory.getAllEvents()
	.then(function (obj) {
		console.log("test", obj.data.events[0])
			$scope.events = obj.data.events
	}).catch(function () {
		console.log("failed")
	})

$rootScope.logout = function () {
	console.log("Clicked")
	$http
		.post(hostedServer + '/logout')
		.then(function () {
			console.log("Logout")
			$location.url('/')
		})
}

	$scope.viewEventPhotos = function (id) {
		console.log("clicked events", id)
		$location.url('/event/' + id)
	}


  $ionicModal.fromTemplateUrl('./templates/eventModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createEvent = function(newEvent) {
    console.log(newEvent)
    $http
    	.post(hostedServer + '/event/new', newEvent)
    	.then(function (msg) {
    		console.log(msg)
    	})
    $scope.modal.hide();
  };

});

