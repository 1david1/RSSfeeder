app.directive('feedItem', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/feedItem.html',
		link: function(scope, element, attrs){
			scope.showInIframe = function(link){
				scope.$parent.$parent.setiFrameProp(link);
			}
		}
	};
});