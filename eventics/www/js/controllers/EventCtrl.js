app.controller('EventCtrl', function($scope, $http, $ionicLoading, $rootScope, $location, $cordovaCamera, hostedServer, userFactory, eventFactory, $stateParams, $state) {


var paramId = $stateParams.id;

$scope.event = '';

var options = {
	quality: 75,
	allowEdit: true,
	targetWidth: 500,
	targetHeight: 500,
	correctOrientation:true
	};

//Sends whole file
$scope.takePhoto = function () {
	var photo = {};
	$cordovaCamera.getPicture(options).then(function(imageData) {
	  resolveLocalFileSystemURL(imageData, function(fe) {
	  	fe.file(function (file) {
				var f = new FileReader();
				f.readAsArrayBuffer(file);
				f.onloadend = function () {
					var x = new XMLHttpRequest();
					var user = userFactory.get()
					x.open('POST', hostedServer + '/event/photo/new/' + user.id + '?' + paramId );
					x.addEventListener('load', function (e) {
					  var newPhoto = JSON.parse(e.target.responseText)
					  $scope.photos.push(newPhoto)
					  $scope.$apply()
					});
					//changed f.result to f
					x.send(f.result);
				}
	  	})
  	})
	})
}

eventFactory.getSingleEvent(paramId)
	.then(function (bothObj) {
		var photos = bothObj.data.eventObj[0]
		var event = bothObj.data.eventObj[1][0]
		console.log('event', bothObj)
		$scope.photos = photos
		$scope.event = event
	})

$scope.getUserPhotos = function (id) {
	$location.url('/user/' + id)
}
$scope.getMorePhotos = function (id) {
	var eventObj = {
		"id": id,
		count: 10
	}
eventFactory.getMorePhotos(eventObj)
	.then(function (newPhotos) {
		var photos = newPhotos.data.eventObj[0]
		photos.forEach(function (photo) {
			$scope.photos.push(photo)
		})
	})
}

$scope.goHome = function () {
	$state.go('home')
}

$scope.doRefresh = function () {
	eventFactory.getSingleEvent(paramId)
	.then(function (bothObj) {
		var photos = bothObj.data.eventObj[0]
		var event = bothObj.data.eventObj[1][0]
		console.log('event', bothObj)
		$scope.photos = photos
		$scope.event = event
		console.log("scopephotos", $scope.photos)
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
}

})










