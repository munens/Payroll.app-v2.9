/*______________________staffEdit:___________________*/

app.controller('staffEditController', function ($http, $scope, $routeParams) {
    $scope.id = $routeParams.id;
    var route = '/staff/edit/' + $routeParams.id;


    $http.get(route).success(function (response) {
        $scope.staff = response;
    });



    $scope.staffUpdate = function () {
        $http.put(route, $scope.staff).success(function (request, response) {
        });
    };

});

/*___________________________________________________________*/