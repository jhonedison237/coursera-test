(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'template.html',
    scope: {
      found: '<'
      //onRemove: '&'
    }
    //controller: NarrowItDownDirectiveController,
    //controllerAs: 'ctrl',
    //bindToController: true,
    //link: xxxDirectiveLink,
    //transclude: true
  };

  return ddo;
}

NarrowItDownController.Sinject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	
	var ctrl = this;
	
	ctrl.search = function() {
		
		var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
		
		promise.then(function (result) {
			// process result and only keep items that match
			var foundItems = result.data;
			var matchFoundItems;

			//for (var i = 0; i < foundItems.length; i++) {
			//  var name = foundItems[i].name;
			//  if (name.indexOf(ctrl.searchTerm) !== -1) {
			//	matchFoundItems.push(foundItems[i]);
			//  }
			//}
			
			ctrl.matchFoundItems = foundItems;
			alert('foundItems.length= ' + foundItems);
			
		}).catch(function (error) {
			console.log("Something went terribly wrong.");
		});
	}
		
	ctrl.removeItem = function(index) {
		alert("remove index: " + index);
	}
}

MenuSearchService.Sinject = ['$http', 'ApiBasePath']; 
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	
	// List of matched found items
	var items = [];
	
	service.getMatchedMenuItems = function(searchTerm) {
		
		return $http({
		  method: "GET",
		  url: (ApiBasePath + "/menu_items.json")
		});
	}
	
}

})();
