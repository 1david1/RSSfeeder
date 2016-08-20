app.controller("mainCtrl", ['$scope','FeedService', '$timeout', function ($scope,Feed,$timeout) {    

		$scope.stopPropogation = true;
		$scope.showIframe = false;
		$scope.rssLinkSrc = '';

		$scope.loadFeed = function(item){        
			Feed.parseFeed(item).then(function(res){
				if (res.data.responseStatus == 200){
					$scope.addToHistoryList($scope.isInHistoryList(item), item);
					$scope.feeds=res.data.responseData.feed.entries;
	          	} else {
	          		alert("an error accourd");
	          	}
			});
		};

		$scope.isInHistoryList = function(item){
			for (var i=0; i < $scope.historyItems.length; i++){
				if ($scope.historyItems[i] == item){
					return false;
					break;	
				}
			}
			return true;
		};

		$scope.addToHistoryList = function(addedToList, item){
			if ($scope.stopPropogation){
			} else if (addedToList) {
				$scope.historyItems.push(item);
				localStorage.setItem("historyItems", JSON.stringify($scope.historyItems));
			} else {
				alert("Can not add the same feed URL");
			}
		};

		$scope.setiFrameProp = function(link){
			$scope.rssLinkSrc = link;
			$scope.showIframe = true;
		}

		if (localStorage.getItem("historyItems")){
			$scope.historyItems = JSON.parse(localStorage.getItem("historyItems"));

			//by default, always show the first RSS link stored
			if ($scope.historyItems.length>0){
				$scope.loadFeed(JSON.parse(localStorage.getItem("historyItems"))[0]);
			};
			$timeout(function() {
				$scope.stopPropogation = false;
			}, 1000);
		} else {
			$scope.historyItems = [];
		};
		

	}]);