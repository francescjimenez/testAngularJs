'use strict';

/* App Module */
var superApp = angular.module('superApp', [
  'ui.router',
  'ngSanitize',
  'eventsController',
])

.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){

  // Definición variables globales
  $rootScope.urlBase = '/testjs/';
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  
}])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	
  $urlRouterProvider.otherwise('/testjs/');
  $stateProvider
    .state('home', {
      url: "/testjs/",
      templateUrl: "/testjs/views/home.html",
      controller: 'EventsCtrl',
    })
    .state('event', {
      url: "/testjs/event/:idEvent",
      templateUrl: "/testjs/views/event.html",
      controller: 'EventsCtrl',
      
    });
  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });    
  
}]);
