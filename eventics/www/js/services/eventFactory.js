app.service('eventFactory', function($state, hostedServer, $http) {
var photos = {};

	this.getAllEvents = function () {
		return $http
			.get(hostedServer + '/getEvents')
	}

	this.getPhotoObject = function () {
		return photos
	}

	this.getSingleEvent = function (id) {
		var eventObj = {
			"id": id,
			"count": 0
		}
		return $http
			.post(hostedServer + '/event/' + id, eventObj)
	}

	this.getMorePhotos = function (eventObj) {
		return $http
			.post(hostedServer + '/event/' + eventObj.id, eventObj)
	}

	// this.getUsers = function () {
	// 	return $http
	// 		.get(hostedServer + '/users')
	// }
})
