app.controller('HomeCtrl', function($scope, $http, $rootScope, $location, $cordovaCamera, hostedServer, userFactory, $cordovaFileTransfer) {


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


//Sends whole file
 //  $scope.takePhoto = function () {
	//   	var photo = {};
	//   	$cordovaCamera.getPicture({}).then(function(imageData) {
	//   		resolveLocalFileSystemURL(imageData, function(fe) {
	//   			fe.file(function (file) {
	//   				var f = new FileReader();
	//   				f.readAsArrayBuffer(file);
	//   				f.onloadend = function () {
	//   					var x = new XMLHttpRequest();
	//   					var user = userFactory.get()
	//   					x.open('POST', hostedServer + '/user/photo/' + user.id );
	//   					x.addEventListener('load', console.log);
	//   					//changed f.result to f
	//   					x.send(f.result);
	//   				}
	//   		})
 //  	})
	// })
	// }
})

