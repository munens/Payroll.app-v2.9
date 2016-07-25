/*______________________staffView:___________________*/

app.controller('staffViewController', function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;
    var route = '/staff/view/' + $routeParams.id;
    
    $http.get(route).success(function (response) {
        $scope.staff = response;
    });
    
    $scope.removeStaff = function (id) {
        $http.delete(route);
        
        var ids = {};
        
        ids.StaffID = id;
        
        console.log(ids);

        $http.get('/loggedin')
            .success(function (user) { 
            $http.put('/deleteid/' + user._id, ids);
        });
    };

});

/*___________________________________________________________*/