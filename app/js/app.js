var myApp = angular.module('myApp',[]);

myApp
	.directive('layout', function() {
		return {

			link: function(scope, elm, attrs) {
				var layout = elm.layout({ applyDefaultStyles: true });

				scope.layout  = layout;

				scope.$watch(attrs.state, function(state) {
					if (state == true) {
						scope.layout.sizePane('east', 120);
						scope.layout.show('west');
						scope.layout.show('south');
					} else {
						scope.layout.sizePane('east', 60);
						scope.layout.hide('west');
						// scope.layout.hide('south');
					}
				});
			}
		};
	}).directive('tabs', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				var panes = $scope.panes = [];

				$scope.select = function(pane) {
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
				}

				this.addPane = function(pane) {
					if (panes.length == 0) $scope.select(pane);
					panes.push(pane);
					console.log(panes);
				}
			},
			template:
				'<div class="tabbable">' +
					'<ul class="nav nav-tabs">' +
					'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
					'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
					'</li>' +
					'</ul>' +
					'<div class="tab-content" ng-transclude></div>' +
					'</div>',
			replace: true
		};
	}).
	directive('pane', function() {
		return {
			require: '^tabs',
			restrict: 'E',
			transclude: true,
			scope: { title: '@' },
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template:
				'<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
					'</div>',
			replace: true
		};
	});

myApp.controller('MyCtrl', function($scope) {
	$scope.bodyState = true
});
