/* use strict */

var app = angular.module('MyApp', ['ngRoute'])

.controller("main", function ($scope)
{
	$scope.message = "I am an annotated message.";
})