"use strict";

app.controller('EventCtrl', function($interval, $window, $scope, $location, hostedServer, eventFactory, $routeParams, $rootScope, $timeout) {

let paramsId = $routeParams.id

// $(document).ready(function(){
//     $('.slideshow').materialbox();
//   });

// Builds Slideshow
	let slides = [];
	let INTERVAL = 3000;
	let buildSlideshow = function () {
		let setCurrentSlideIndex = function(index) {
			$scope.currentIndex = index;
			}
		let isCurrentSlideIndex = function(index) {
			    return $scope.currentIndex === index;
			}
		let nextSlide = function() {
			    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
			    $timeout(nextSlide, INTERVAL);
			}
		let loadSlides = function() {
			    $timeout(nextSlide, INTERVAL);
			}
			$scope.slides = slides;
			$scope.currentIndex = 0;
			$scope.setCurrentSlideIndex = setCurrentSlideIndex;
			$scope.isCurrentSlideIndex = isCurrentSlideIndex;
			loadSlides();
	}

let photos = {};

	eventFactory.getSingleEvent(paramsId)
		.then((bothObj) => {
			photos = bothObj.data.eventObj[0]
			let event = bothObj.data.eventObj[1][0]
			$scope.photos = photos
			$scope.event = event
			$scope.photos.forEach((photo) => {
				slides.push(photo.imageUrl)
			})
			buildSlideshow()
		})

	$interval(function() {
		eventFactory.getSingleEvent(paramsId)
			.then((polledObj) => {
				let newPhotoObj = polledObj.data.eventObj[0]
					$scope.photos = newPhotoObj
					slides = $scope.photos.map(p => p.imageUrl)

			})

	}, 10000)

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

$scope.viewSlideShow = false;

	$scope.openSlideshow = (e) => {
		console.log(e)
		$scope.viewSlideShow = !$scope.viewSlideShow;
		$('.slideshow').materialbox();
	}



})
