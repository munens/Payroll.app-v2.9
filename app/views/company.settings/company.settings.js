/*______________________companySettings:____________*/


app.controller('companySettingsController', function ($scope, $http) {

    $http.get('/loggedin')
        .success(function (user) {
            $scope.Account = user;
        });

    $scope.update = function () {

        $http.get('/loggedin')
            .success(function (user) {
                console.log("what is the change: ", $scope.Account, user._id);
                $http.put('/onboarding/' + user._id, $scope.Account.Company)
                    .success(function (response) {
                        console.log(response);
                    });

            });
        }

});

/*___________________________________________________________*/
