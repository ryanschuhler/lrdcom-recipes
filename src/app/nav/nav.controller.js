navigation.controller('navController', function($scope, $http, hotkeys) {

    $scope.toggleMenu = function() {
        $scope.checked = !$scope.checked;
        $('#wrapper').addClass("diminish");
    };

    $scope.data = {
    	General: "something"
    };

    $scope.closeMenu = function() {
        $('#wrapper').removeClass("diminish");
    };

    $scope.openSearch = function(mode) {
        var $searchContainer = $('.search-container');
        var $searchInput = $('.search-input');

        $searchContainer.removeClass('hide show');

            if (mode === 'hide') {
                $searchContainer.addClass('hide');
            }
            else if (mode === 'show') {
                $searchContainer.addClass('show');
                $('.search-input').focus();
            }
    };

    hotkeys.add({
        combo: 'esc',
        callback: function() {
            $scope.openSearch('hide');
        }
    });

    hotkeys.add({
        combo: '/',
        callback: function() {
            $scope.openSearch('show');
        }
    });

    $http.get('src/js/ui/navigation/navigation.json')
        .then(function(res) {
            $scope.data = res.data;
        });
});
