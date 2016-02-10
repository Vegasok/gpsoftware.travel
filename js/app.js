	var app = angular.module('app', ['ngRoute']);		
	
	app.config(function ($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'views/sum.html'
			})
			.when('/:firstNumber/:secondNumber',{
				templateUrl: 'views/route.html',
				controller: 'AppCtrl'
				
			})
			.otherwise({
				redirectTo: '/'
			});
	});

	app.controller('AppCtrl', function($scope, $routeParams, $location) {

		$scope.firstNumber = parseInt($routeParams.firstNumber);
		$scope.secondNumber = parseInt($routeParams.secondNumber);   		

   		 function createPath(separator) {
            separator = separator || '/';

            return separator + $scope.firstNumber + separator + $scope.secondNumber;
        };

        function changeURL(path) {
            $location.url(path);
        }

        $scope.changeURL = _.compose(changeURL, createPath);   		
		
	});



	app.service('currency', function($http){

		var url = 'http://api.fixer.io/latest';

		this.http = function(url){
			return $http({
				method: 'GET',
				url: url
			}).then(function(response){
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
 			$scope.getCurrencies = data.rates;
		});
				
	});