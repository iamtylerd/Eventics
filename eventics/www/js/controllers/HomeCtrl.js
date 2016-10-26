app.controller('HomeCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera, hostedServer, userFactory, $cordovaFileTransfer, eventFactory) {

eventFactory.getAllEvents()
	.then(function (obj) {
		console.log("test", obj.data.events[0])
			$scope.events = obj.data.events
	}).catch(function () {
		console.log("failed")
	})

$rootScope.logout = function () {
	console.log("Clicked")
	$http
		.post(hostedServer + '/logout')
		.then(function () {
			console.log("Logout")
			$location.url('/')
		})
}


//Sends whole file
  $scope.takePhoto = function () {
	  	var photo = {};
	  	$cordovaCamera.getPicture({}).then(function(imageData) {
	  		resolveLocalFileSystemURL(imageData, function(fe) {
	  			fe.file(function (file) {
	  				var f = new FileReader();
	  				f.readAsArrayBuffer(file);
	  				f.onloadend = function () {
	  					var x = new XMLHttpRequest();
	  					var user = userFactory.get()
	  					x.open('POST', hostedServer + '/user/photo/' + user.id );
	  					x.addEventListener('load', function (e) {
	  						// var events = JSON.parse(e.target.responseText)
	  						// $scope.events = events
	  						// $scope.$apply()
	  					});
	  					//changed f.result to f
	  					x.send(f.result);
	  				}
	  		})
  	})
	})
	}

	$scope.viewEventPhotos = function (id) {
		console.log("clicked events", id)
		$location.url('/event/' + id)
	}
})

