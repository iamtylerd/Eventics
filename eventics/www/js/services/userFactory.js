app.service('userFactory', function($state) {
	var user = {};

	this.get = function () {
		return user;
	}

	this.set = function (obj) {
		user.id = obj._id
	}
})
