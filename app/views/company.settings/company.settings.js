/*______________________companySettings:____________*/


app.controller('companySettingsController', function ($scope, $http) {

    $http.get('/loggedin')
        .success(function (user) {
            $scope.Account = user;
        });

    $scope.update = function () {

        $http.get('/loggedin')
            .success(function (user) {

                $http.put('/onboarding/' + user._id, $scope.Account)
                    .success(function (response) {
                        console.log(response);
                    });

            });
        }

});

/*___________________________________________________________*/
