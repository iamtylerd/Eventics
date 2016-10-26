app.service('eventFactory', function($state, hostedServer, $http) {
var photos = {};

	this.getAllEvents = function () {
		return $http
			.get(hostedServer + '/getEvents')
	}

	this.getSingleEvent = function (id) {
		return $http
			.get(hostedServer + '/event/' + id)
	}

	this.getPhotoObject = function () {
		return photos
	}
})
