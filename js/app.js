	var app = angular.module('RSSFeedApp', []);

	app.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {    
		$scope.historyItems = [];

		$scope.loadFeed=function(e, item){        
			Feed.parseFeed($scope.feedSrc).then(function(res){
				if (res.data.responseStatus == 200){
					$scope.addToHistoryList(item);
					$scope.loadBtnText=angular.element(e.target).text();
					$scope.feeds=res.data.responseData.feed.entries;
	          	} else {
	          		alert("an error accourd");
	          	}
			});
		};

		$scope.addToHistoryList = function(item){
			var addToList = true;
			for (var i=0; i < $scope.historyItems.length; i++){
				if ($scope.historyItems[i] == item){
					addToList = false;
					break;	
				}
			}

			addToList ? $scope.historyItems.push(item) : alert("Can not add the same feed URL");
			console.log($scope.historyItems);
		}

	}]);
