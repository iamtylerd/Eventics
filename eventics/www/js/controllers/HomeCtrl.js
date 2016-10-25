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

	// var options = {
	//   quality: 75,
	//   destinationType: Camera.DestinationType.DATA_URL,
	//   sourceType: Camera.PictureSourceType.CAMERA,
	//   allowEdit: true,
	//   encodingType: Camera.EncodingType.JPEG,
	//   targetWidth: 500,
	//   targetHeight: 500,
	//   popoverOptions: CameraPopoverOptions,
	//   saveToPhotoAlbum: true,
	// correctOrientation:true
	// };


  $scope.takePhoto = function () {
	  	var photo = {};
	  	$cordovaCamera.getPicture({}).then(function(imageData) {

	  		resolveLocalFileSystemURL(imageData, function(fe) {
	  		// 	console.log("fe", fe)
	  			fe.file(function (file) {
	  				var f = new FileReader();
	  				f.readAsArrayBuffer(file);
	  				f.onloadend = function () {
	  					var x = new XMLHttpRequest();
	  					x.open('POST', 'http://10.10.10.198:3000/test');
	  					x.addEventListener('load', console.log);
	  					x.send(f.result);
	  					// $http
					   //   	.get('http://10.10.10.198:3000/ping')
					   //   	.then(console.log)
					   //   	.then(function () { $http.post('http://10.10.10.198:3000/test', f.result, {
					   //   			headers: { 'Content-Type': undefined } }
					   //   		)})
					   //   	.then(console.log)
					   //   	.catch(console.error)
					   //   }
	  				}

	  			// 	var options = {
					 //    fileKey: "photo",
					 //    fileName: "image.png",
					 //    chunkedMode: false,
					 //    mimeType: "image/png",
					 //    httpMethod: "POST"
						// };
	  			// 	// console.log(file)
			  		// var user = userFactory.get()
			  	// 	console.log(hostedServer + '/user/photo/' + user.id)
			  	// 	$cordovaFileTransfer.upload(hostedServer + '/user/photo/' + user.id, file.localURL, options).then(function(result) {
	     //        console.log("SUCCESS: " + JSON.stringify(result.response));
	     //    }, function(err) {
	     //        console.log("ERROR: " + JSON.stringify(err));
	     //    }, function (progress) {
	     //        // constant progress updates
	     //    });
	     // debugger



	  		})



		    		// // .post(hostedServer + '/user/photo/' + user.id, file)
		    		// .then(function (obj) {
		    		// 	console.log(obj)
		    		// })  		})

  	})
	})
	}
})

