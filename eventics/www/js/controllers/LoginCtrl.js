app.controller('LoginCtrl', function($window, $scope, $ionicLoading, $http, $location, hostedServer, userFactory, $localStorage) {



$scope.loginObj = {
	username: "",
	password: ""
}
$scope.registerObj = {
	username: "",
	email: "",
	password: ""
}

$scope.$storage = $localStorage;

console.log($scope.$storage)

$scope.createUser = function () {
	$ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function(){
       	$http
					.post(hostedServer + '/register', $scope.registerObj)
					.then(function () {
						$window.localStorage.setItem('loggedIn', true)
						$location.url('/home')
					})
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    })
}

$scope.login = function () {
	 $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function(){
       	$http
					.post(hostedServer + '/login', $scope.loginObj)
						.then(function (obj) {
							userFactory.set(obj.data)
							$window.localStorage.setItem('loggedIn', true)
							$location.url('/home')
							console.log(obj)
		})
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
}
})
