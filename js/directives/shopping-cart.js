'use strict';

superApp.directive('shoppingCart', ['$stateParams', 'Cart', function ($stateParams, Cart)
{
  function link(scope, element, attrs) {
    
    var cart = Cart.get();
    scope.cart = cart;
		
    scope.removeSession = function(session){
      if(cart[$stateParams.idEvent]['sessions'][session.date]>0){
        cart[$stateParams.idEvent]['sessions'][session.date]--;
        cart[$stateParams.idEvent]['event']['count']--;
      }
    };
    
    scope.addSession = function(session){
      if(session.availability-cart[$stateParams.idEvent]['sessions'][session.date]>0){
        cart[$stateParams.idEvent]['sessions'][session.date]++;
        if(typeof cart[$stateParams.idEvent]['event'] == 'undefined'){
          cart[$stateParams.idEvent]['event'] = {
            'id': $stateParams.idEvent,
            'title': attrs.title,
            'count': 1,
          };
        }else{
          cart[$stateParams.idEvent]['event']['count']++;
        }
      }
    };
    
    scope.trashSession = function(itemId, dateSession){
      cart[itemId]['sessions'][dateSession]--;
      cart[itemId]['event']['count']--;
    }
    
    scope.isEventOk = function(eventoId){
      var mostrar = false;
      if(typeof cart[eventoId] != 'undefined' && cart[eventoId]['event']['count']>0){
          mostrar = true;
      }
      return mostrar;
    }
  }
  return {
    link: link,
    template: '<div ng-repeat="item in cart" ng-if="isEventOk(item.event.id)" class="cart">'+
                '<p class="title">{{item.event.title}}</p>'+
                '<ul class="listCart">'+
                  '<li  ng-repeat="(key, session) in item.sessions" ng-if="session>0">'+
                    '<span class="date">{{key | date:\'dd/MM/yyyy\'}}</span>'+
                    '<span class="trash" ng-click="trashSession(item.event.id, key)"></span>'+
                    '<span class="count">x{{session}}</span>'+
                  '</li>'+
                '</ul>'+
              '</div>'
  }
}]);

/*
  La factorya de cart deberia ir donde los servicios, pero como tenia dudas de si se queria un módulo o una directiva lo he agupado aqui
*/
superApp.factory('Cart', function() {
   var cart = {};
   return {
     get: function() { return cart; },
     setCart: function(newCart) { cart = newCart }
   };
});
