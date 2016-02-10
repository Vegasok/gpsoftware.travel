app.directive('pkSum', function(){
	return {
		restrict: 'E',
		scope:{
			first: '=',
            second: '='
		},
		
		templateUrl: 'js/directives/appSummarize.html'
		
	};
});