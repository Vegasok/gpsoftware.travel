var app = angular.module('app', ['ngRoute']);	
	
app.config(function ($routeProvider){
	$routeProvider
		.when('/summarize', {
			template: '<pk-sum></pk-sum>',
			controller: 'AppCtrl'
		})
		.when('/summarize/:firstNumber/plus/:secondNumber',{
			template: '<pk-sum></pk-sum>',
			controller: 'AppCtrl'
			
		})
		.otherwise({
			redirectTo: '/summarize'
		});
}); 

app.controller('AppCtrl', function($scope, currency, $routeParams, $location) {

	$scope.firstNumber = parseInt($routeParams.firstNumber) || 0;
	$scope.secondNumber = parseInt($routeParams.secondNumber) || 0;  

	$scope.$watch('firstNumber', function(newValue, oldValue) { 	        
      	$location.path('/summarize/' + $scope.firstNumber + '/plus/' + $scope.secondNumber);	    
	});

	$scope.$watch('secondNumber', function(newValue, oldValue) {	      
	  	$location.path('/summarize/' + $scope.firstNumber + '/plus/' + $scope.secondNumber);
	}); 	
	
});

app.service('currency', function($http){

	var url = 'http://api.fixer.io/latest';	

		this.http = function(url){
			return $http.get(url).then(function(response){
				return response.data;
			}, function(error) {
				return error;
			});
		};		

	this.getCurrencies = function(){

			return this.http(url);				
	}
});	

app.controller('ConvertCurrency', function($scope, currency){
  currency.getCurrencies().then(function(data) {
		$scope.data = data;
		$scope.convertedCurrency = $scope.data.rates['CAD'] * $scope.result;
		$scope.selectCurrency = $scope.data.rates;		
		$scope.selectedCurrency = $scope.selectCurrency['CAD'];
		
	});		
	
	$scope.$watch('result + selectedCurrency', function() {
		$scope.convertedCurrency = ($scope.data ? $scope.selectedCurrency : 1) * $scope.result;
	});

});