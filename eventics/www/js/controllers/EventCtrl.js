app.controller('EventCtrl', function($scope, $http, $rootScope, $location, hostedServer, userFactory, eventFactory, $stateParams) {


var paramId = $stateParams.id

eventFactory.getSingleEvent(paramId)
	.then(function (photoObj) {
		console.log(photoObj.data)
	})

})
