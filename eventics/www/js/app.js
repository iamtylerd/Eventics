var app = angular.module('app', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.constant('hostedServer', 'https://eventics.herokuapp.com/api')


.config(function($stateProvider, $urlRouterProvider, $httpProvider) {


  $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('index',{
      url:'/',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('home',{
      url:'/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
  })
  .state('fail',{
      url:'/404',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('event',{
      url:'/event/:id',
      templateUrl: 'templates/event.html',
      controller: 'EventCtrl'
  })
  $urlRouterProvider.otherwise('/');

});
