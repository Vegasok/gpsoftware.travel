app.directive('pkSum', function(){
	return {

		link: function(scope) {
	     scope.$watch('firstNumber + secondNumber', function(){
	        scope.result = parseInt(scope.firstNumber) + parseInt(scope.secondNumber);
	      });
	 	},
		restrict: 'E',
			
		templateUrl: 'src/js/directives/sum.directive.html'
		
	};
});