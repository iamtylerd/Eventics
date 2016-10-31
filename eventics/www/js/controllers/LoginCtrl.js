app.controller('LoginCtrl', function($window, $scope, $http, $location, hostedServer, userFactory, $localStorage) {



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
	$http
		.post(hostedServer + '/register', $scope.registerObj)
		.then(function () {$location.url('/home')})

}

$scope.login = function () {
	$http
		.post(hostedServer + '/login', $scope.loginObj)
		.then(function (obj) {
			userFactory.set(obj.data)
			$window.localStorage.setItem('loggedIn', true)
			$location.url('/home')
			console.log(obj)
		})
}
})
