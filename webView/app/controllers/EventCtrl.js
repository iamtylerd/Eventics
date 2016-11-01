"use strict";

app.controller('EventCtrl', function($window, $scope, $location, hostedServer, eventFactory, $routeParams) {

let paramsId = $routeParams.id

	eventFactory.getSingleEvent(paramsId)
		.then((bothObj) => {
			let photos = bothObj.data.eventObj[0]
			let event = bothObj.data.eventObj[1][0]
			$scope.photos = photos
			$scope.event = event
			console.log($scope.photos)
		})

	$scope.getMorePhotos =  (id) => {
	let eventObj = {
		"id": id,
		count: 10
	}
	eventFactory.getMorePhotos(eventObj)
		.then((newPhotos) => {
			let photos = newPhotos.data.eventObj[0]
			photos.forEach(function (photo) {
				$scope.photos.push(photo)
			})
		})
}



})
