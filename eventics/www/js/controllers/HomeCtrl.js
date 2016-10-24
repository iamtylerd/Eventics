'use strict';
app.controller('HomeCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera) {



$rootScope.logout = function () {
	console.log("Clicked")
	$http
		.post(`/api/logout`)
		.then(function () {
			console.log("Logout")
			$location.url('/')
		})
}

  document.addEventListener("deviceready", function () {

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

    var takePhoto = function () {
    	console.log("camera")
    	$cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
}
  }, false);

})


