'use strict';

superApp.factory('Events', function($http){
  return {
    getEvents: function(){
      return $http({
        url: '/testjs/assets/data/events.json',
        method: 'GET'
      })
    },
    getEventInfo: function(id){
      return $http({
        url: '/testjs/assets/data/event-info-'+id+'.json',
        method: 'GET'
      })
    }
  };
 });


superApp.factory('Page', function() {
   var title = 'Catalog';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
});