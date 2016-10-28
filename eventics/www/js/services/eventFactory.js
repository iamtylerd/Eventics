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
		return $http
			.get(hostedServer + '/event/' + id)
	}

	// this.getUsers = function () {
	// 	return $http
	// 		.get(hostedServer + '/users')
	// }
})
