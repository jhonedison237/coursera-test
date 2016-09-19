(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.Sinject = ['$scope'];
function LunchCheckController($scope) {
	$scope.dishes = "";
	$scope.message = "";
	$scope.color = "balck"
	
	$scope.checkDishes = function() {
		
		var arrayDishes = $scope.dishes.split(",");
		var count = arrayDishes.length;
		$scope.color = "";
		
		if ($scope.dishes == "") {
			$scope.message = "Please enter data first";
			$scope.color = "red";
		} else if (count <=3){
			$scope.message = "Enjoy!"
			$scope.color = "green"
		} else {
			$scope.message = "Too much!"
			$scope.color = "green"
		}
	};
}


})();
