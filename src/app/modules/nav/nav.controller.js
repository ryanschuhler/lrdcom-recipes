navigation.controller('navController', function($scope, $http, hotkeys) {

    $scope.toggleMenu = function() {
        $scope.checked = !$scope.checked;
        $('#wrapper').addClass("diminish");
    };

    $scope.closeMenu = function() {
        $('#wrapper').removeClass("diminish");
    };

    $http.get('src/app/modules/nav/navigation.json')
        .then(function(res) {
            $scope.data = res.data;
        });
});
