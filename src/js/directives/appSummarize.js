app.directive('pkSum', function(){
	return {
		restrict: 'E',
		scope:{
			first: '=',
            second: '='
		},
		
		template: "<p>Sum of two Numbers:<input type='text' ng-value='first + second' disabled/></p>"
		
	};
});