app.directive('pkSum', function(){
	return {

		link: function(scope, element, attributes) {
	     scope.$watch('firstNumber + secondNumber', function(newValue){
	        scope.result = parseInt(scope.firstNumber) + parseInt(scope.secondNumber);
	      });
	 	},
		restrict: 'E',
			
		templateUrl: 'src/js/directives/sum.directive.html'
		
	};
});