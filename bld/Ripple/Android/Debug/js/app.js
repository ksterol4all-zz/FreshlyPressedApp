var App = angular.module("App", ["ionic"]);

App.service("FreshlyPressed", ["$http", "$log", FreshlyPressed]);

//Freshly Pressed inside the controller is a service been hooked to the controller
App.controller("AppCtrl", ["$scope", "FreshlyPressed", "$log", AppCtrl]);

function AppCtrl($scope, FreshlyPressed, $log) {
    //create a model
    $scope.posts = [];
    $scope.refresh = function () {
        FreshlyPressed.getBlog($scope);
    }
}

function FreshlyPressed($http, $log) {
    //attaching a function to the service
    this.getBlog = function ($scope) {
        $http.jsonp("https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK")
        .success(function (result){
            $scope.posts = result.posts;
            $scope.$broadcast("scroll.refreshComplete");
        });
    }
}