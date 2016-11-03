app.controller('HomeCtrl', function($cordovaToast, $ionicFilterBar, $window, $localStorage, $ionicModal, $scope, $http, $rootScope, $location, hostedServer, userFactory, $cordovaFileTransfer, eventFactory) {


eventFactory.getAllEvents()
	.then(function (obj) {
			$scope.events = obj.data.events
			console.log($scope.events)
	}).catch(function () {
		console.log("failed")
	})

	$scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.events,
        update: function (filteredItems, filterText) {
          $scope.events = filteredItems;
          if (filterText) {

          }
        }
      });
    };

$rootScope.logout = function () {
	console.log("Clicked")
	$window.localStorage.setItem('loggedIn', false)
	$http
		.post(hostedServer + '/logout')
		.then(function () {
			$cordovaToast
		    .show('Logged Out!', 'long', 'center')
		    .then(function(success) {
					$location.url('/login')
		      // success
		    }, function (error) {
		      // error
		    });

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
    $http
    	.post(hostedServer + '/event/create/new', newEvent)
    	.then(function (msg) {
    		eventFactory.getAllEvents()
					.then(function (obj) {
						$cordovaToast
					    .show(`Created the event - ${msg.data.eventName}`, 'long', 'center')
					    .then(function(success) {
					      // success
									$scope.events = obj.data.events
								}).catch(function () {
									console.log("failed")
								})
					    }, function (error) {
					      // error
					    });
    	})
    $scope.modal.hide();
  };

$scope.doRefresh = function () {
	eventFactory.getAllEvents()
		.then(function (obj) {
			$scope.events = obj.data.events
			console.log($scope.events)
	}).catch(function () {
		console.log("failed")
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
}

});

