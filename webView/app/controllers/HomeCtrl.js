"use strict";

app.controller('HomeCtrl', function($window, $scope, $location, hostedServer, eventFactory) {

eventFactory.getEventsAndPhotos()
	.then((obj) => {
		$scope.events = obj.data.events
		console.log(obj)
	})

	$scope.viewEvent = (event) => {
		$location.url('/event/' + event._id)
	}



})
