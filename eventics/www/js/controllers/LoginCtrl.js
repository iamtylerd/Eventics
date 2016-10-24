'use strict';
app.controller('LoginCtrl', function($scope, $http, $location) {


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
		.post(`/api/reigster`, $scope.registerObj)
		.then(function () {$location.url('/home')})

}

$scope.login = function () {
	$http
		.post(`/api/login`, $scope.loginObj)
		.then(function (obj) {
			$location.url('/home')
			console.log(obj)
		})
}
})
