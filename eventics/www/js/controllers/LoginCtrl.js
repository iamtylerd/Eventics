'use strict';
app.controller('LoginCtrl', function($scope, $http) {


console.log('loginCtrl')

$scope.login = () => {
	console.log("before Server")
	$http
		.post('http://localhost:3000/api/login')
		.then(console.log("Done"))
}
})
