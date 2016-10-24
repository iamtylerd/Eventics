app.controller('LoginCtrl', function($scope, $http, $location, hostedServer) {


$scope.loginObj = {
	username: "",
	password: ""
}
$scope.registerObj = {
	username: "",
	email: "",
	password: ""
}

$scope.createUser = function () {
	$http
		.post(hostedServer + '/register', $scope.registerObj)
		.then(function () {$location.url('/home')})

}

$scope.login = function () {
	$http
		.post(hostedServer + '/login', $scope.loginObj)
		.then(function (obj) {
			$location.url('/home')
			console.log(obj)
		})
}
})
