(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'template.html'
    //scope: {
      //found: '<',
      //onRemove: '&'
    //},
    //controller: NarrowItDownDirectiveController,
    //controllerAs: 'ctrl',
    //bindToController: true//,
    //link: xxxDirectiveLink,
    //transclude: true
  };

  return ddo;
}

NarrowItDownController.Sinject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	
	var ctrl = this;
	ctrl.found = 1;
	
	ctrl.search = function() {
		
		var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
		
		promise.then(function (result) {
			// process result and only keep items that match
			var foundItems = result.data

			console.log("foundItem:" + result.data)
			ctrl.found = foundItems;
			alert("foundItems: " + ctrl.found[3].name + " lenght: " + ctrl.found.length);
		}).catch(function (error) {
			console.log("Something went terribly wrong.");
		});
	}
		
	ctrl.removeItem = function(index) {
		alert("remove");
	}
}

MenuSearchService.Sinject = ['$http', 'ApiBasePath']; 
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	
	// List of matched found items
	var items = [];
	
	service.getMatchedMenuItems = function(searchTerm) {
		
		alert("searchTerm: " + searchTerm);
		
		return $http({
		  method: "GET",
		  url: (ApiBasePath + "/categories.json"),
		  params: {
			category: searchTerm
		  }
		});
	}
	
}


})();
