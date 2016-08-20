app.directive('historyItem', function() {
	return {
		restrict: 'E',
		scope: {
			info: '=',
			index: '='
		},
		templateUrl: 'js/directives/historyItem.html',
		link: function(scope, element, attrs){
			scope.removeFromList = function(itemIndex){
				scope.$parent.$parent.historyItems.splice(itemIndex, 1);
				localStorage.setItem("historyItems", JSON.stringify(scope.$parent.$parent.historyItems));
			};
			scope.loadFeed = function(item){
				scope.$parent.$parent.stopPropogation = true;
				scope.$parent.$parent.showIframe = false;
				scope.$parent.$parent.loadFeed(item);
			}
		}
	};
});