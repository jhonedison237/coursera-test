(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.Sinject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
	
	var toBuy = this;
	
	toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyArray();
	
	toBuy.buyItem = function(index) {
		ShoppingListCheckOffService.buyItem(index);
	}
}

AlreadyBoughtController.Sinject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
	
	var bought = this;
	
	bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
	var service = this;
	
	var itemsToBuy = [
		{ name: "cookies", quantity: 4 }, 
		{ name: "chips", quantity: 5 },
		{ name: "bread", quantity: 1 },
		{ name: "pies", quantity: 2 },
		{ name: "donuts", quantity: 3 }
	];
				
	var boughtItems = [];
	
	service.getToBuyArray = function() {
						
		return itemsToBuy;
	}
	
	service.getBoughtItems = function() {
		
		return boughtItems;
	}
	
	service.buyItem = function(index) {
		
		boughtItems.push(itemsToBuy[index]);
		//boughtItems.push({ name: "donuts", quantity: 3 });
		itemsToBuy.splice(index, 1);
	}
}


})();
