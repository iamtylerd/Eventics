app.controller('LoginCtrl', function($window, $scope, $ionicLoading, $http, $location, hostedServer, userFactory, $localStorage) {

$scope.loginHide = true;
$scope.registerHide = true;

$scope.showRegister = function () {
	$scope.registerHide = false;
}
$scope.showLogin = function () {
	$scope.loginHide = false;
}

$scope.cancelAction = function () {
	$scope.loginHide = true;
	$scope.registerHide = true;
}


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
					.then(function (obj) {
						userFactory.set(obj.data)
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
