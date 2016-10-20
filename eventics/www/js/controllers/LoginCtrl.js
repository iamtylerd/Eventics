'use strict';
app.controller('LoginCtrl', function($scope, $http) {


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
		.post('http://localhost:3000/api/reigster', $scope.registerObj)
		.then((obj) => console.log(obj))

}

$scope.login = () => {
	console.log()
	$http
		.get('http://localhost:3000/api/login')
		.then(console.log("Done"))
}
})
