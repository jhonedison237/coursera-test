(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'template.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	
	var ctrl = this;
	
	ctrl.search = function() {
		
		var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
		
		promise.then(function (result) {
			
			// process result and only keep items that match
			var foundItems = result.data.menu_items;
			var matchFoundItems = [];

			for (var i = 0; i < foundItems.length; i++) {
			  var name = foundItems[i].description;
			  if (name.indexOf(ctrl.searchTerm) !== -1) {
				matchFoundItems.push(foundItems[i]);
			  }
			}
			
			ctrl.found = matchFoundItems;
			
		}).catch(function (error) {
			console.log("Something went terribly wrong.");
		});
	}
		
	ctrl.removeItem = function(index) {
		ctrl.found.splice(index, 1);
	}
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']; 
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	
	service.getMatchedMenuItems = function(searchTerm) {
		
		return $http({
		  method: "GET",
		  url: (ApiBasePath + "/menu_items.json")
		});
	}
	
}

})();
