'use strict';
var eventsController = angular.module('eventsController', []);

/************/
/* EVENTOS */
/************/
eventsController.controller('EventsCtrl', [ '$scope', '$window', '$state', 'Events', 'Page', '$http', '$stateParams',
  function($scope, $window, $state, Events, Page, $http, $stateParams){ 
    if(typeof $stateParams.idEvent == 'undefined'){
      
      $window.document.title = 'Catalog';

      // Modificar meta title: podriamos crear una factoria y poner la app en el tag <html> para poder modificarlo por angular
      // Page.setTitle('Catalog');

      $scope.listaEventos = [];
      Events.getEvents().success(function(response) { 
        $scope.listadoEventos = response;  
      }).error(function(data, status){
        alert('Error');
        console.log('Code error: '+status);
      });
    }else{

      // Page.setTitle('Sessions');
      $window.document.title = 'Sessions';
      
      Events.getEventInfo($stateParams.idEvent ).success(function(response) { 
        $scope.evento = response;  
      }).error(function(data, status){
        $scope.alertError = 'EVENT INFO NOT FOUND';
        console.log('Code error: '+status);
      });
    }  
  }
]);
