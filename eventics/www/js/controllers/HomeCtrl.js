app.controller('HomeCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera, hostedServer, userFactory) {



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
	  quality: 75,
	  destinationType: Camera.DestinationType.DATA_URL,
	  sourceType: Camera.PictureSourceType.CAMERA,
	  allowEdit: true,
	  encodingType: Camera.EncodingType.JPEG,
	  targetWidth: 500,
	  targetHeight: 500,
	  popoverOptions: CameraPopoverOptions,
	  saveToPhotoAlbum: true,
	correctOrientation:true
	};

  $scope.takePhoto = function () {
  	console.log("camera")
  	$cordovaCamera.getPicture(options).then(function(imageData) {

  		var user = userFactory.get()
    	$http
    		.post(hostedServer + '/user/photo/' + user.id, { image: imageData })
    		.then(function (obj) {
    			console.log(obj)
    		})

  }, function(err) {
    // error
    console.log(err)
  });
}


})


