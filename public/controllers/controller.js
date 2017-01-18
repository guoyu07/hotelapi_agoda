var hotelApp = angular.module('hotelApp', []);
    
hotelApp.controller('AppCtrl', function ($scope, $http) {
 
      $scope.submit = function() {
         var hotelCity = $scope.hotelCity ;
         var sortBy = $scope.sortSelect;

         $http.get("/"+hotelCity+"/"+sortBy)
            .then(function (response) {
                $scope.hotelsInfo = response.data;
                $scope.hotelId = '';
                $scope.sortSelect = '';
            });
      };

});