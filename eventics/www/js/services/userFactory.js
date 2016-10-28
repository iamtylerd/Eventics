app.service('userFactory', function($window, $state, $localStorage, $http, hostedServer) {
	var user = {};

	this.get = function () {
		return user;
	}

	this.set = function (obj) {
		user.id = obj._id
	}

	this.checkLogin = function () {

		return window.localStorage.setItem("loggedIn", false);
	}

	this.getUserCollection = function (id) {
		return $http
							.get(hostedServer + '/user/' + id)
	}

	this.getUserPhotos = function (id) {
		return $http
			.get(hostedServer + '/user/' + id + '/photos/')
	}
})
