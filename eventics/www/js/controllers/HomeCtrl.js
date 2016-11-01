app.controller('HomeCtrl', function($ionicFilterBar, $window, $localStorage, $ionicModal, $scope, $http, $rootScope, $location, hostedServer, userFactory, $cordovaFileTransfer, eventFactory) {

if(!userFactory.isLoggedIn()) {
	$location.url('/login')
}

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
			console.log("Logout")
			$location.url('/login')
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
    		eventFactory.getAllEvents()
					.then(function (obj) {
						console.log(obj)
						$scope.events = obj.data.events
					}).catch(function () {
						console.log("failed")
					})
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

