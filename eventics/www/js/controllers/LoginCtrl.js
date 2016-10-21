'use strict';
app.controller('LoginCtrl', function($scope, $http) {

let URL = process.env.HOSTED_URL || 'http://localhost:3000'

$scope.loginObj = {
	username: "",
	password: ""
}
$scope.registerObj = {
	username: "",
	email: "",
	password: ""
}

$scope.createUser = () => {
	$http
		.post(`${URL}/api/reigster`, $scope.registerObj)
		.then((obj) => console.log(obj))

}

$scope.login = () => {
	console.log()
	$http
		.get(`${URL}/api/login`)
		.then(console.log("Done"))
}
})
