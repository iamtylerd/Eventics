app.controller('HomeCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera, hostedServer) {



$rootScope.logout = function () {
	console.log("Clicked")
	$http
		.post(hostedServer + '/logout')
		.then(function () {
			console.log("Logout")
			$location.url('/')
		})
}


	var options = {
	  quality: 50,
	  destinationType: Camera.DestinationType.DATA_URL,
	  sourceType: Camera.PictureSourceType.CAMERA,
	  allowEdit: true,
	  encodingType: Camera.EncodingType.JPEG,
	  targetWidth: 100,
	  targetHeight: 100,
	  popoverOptions: CameraPopoverOptions,
	  saveToPhotoAlbum: true,
	correctOrientation:true
	};

  $scope.takePhoto = function () {
  	console.log("camera")
  	$cordovaCamera.getPicture(options).then(function(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }, function(err) {
    // error
  });
}


})


