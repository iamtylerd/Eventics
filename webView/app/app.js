"use strict";

const app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMdIcons' ])
.constant('hostedServer', 'https://eventics.herokuapp.com/api');
// .constant('hostedServer', 'http://localhost:3000/api')


app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});



app.config(function($routeProvider) {

    $routeProvider.
        when('/home', {
        	templateUrl: 'partials/home.html',
        	controller: 'HomeCtrl'
        }).
        when('/event/:id', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl'
        }).
        otherwise('/home');
});
