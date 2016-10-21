'use strict';
app.controller('LoginCtrl', function($scope, $http, $location) {

let URL = 'http://localhost:3000';


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
		.then((obj) => $location.url('/home'))

}

$scope.login = () => {
	$http
// ({
// 		method: 'POST',
// 		url: `${URL}/api/login`,
// 		data: $scope.loginObj,
// 		headers: {
// 			'Origin': `${URL}`,
// 			'Access-Control-Request-Method': 'POST',
// 			'Access-Control-Request-Headers': 'X-Custom-Header'
// 		}
// 	})
		.post(`${URL}/api/login`, $scope.loginObj)
		.then((obj) => {
			$location.url('/home')
			console.log(obj)
		})
// }
}
})
