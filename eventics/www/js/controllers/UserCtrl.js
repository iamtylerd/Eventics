app.controller('UserCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera, hostedServer, userFactory, eventFactory, $stateParams) {


var paramId = $stateParams.id;

userFactory.getUserPhotos(paramId)
	.then(function (user) {
		console.log(user.data)
		$scope.photos = user.data.photosObj
	})
})










