/*_______________________sign-up:___________________*/

app.controller('onBoardingController', function ($scope, $http) {
    
    $scope.update = function () {
        
        $http.get('accountID').success(function (response) {
            
            for (var i = 0; i < 1; i++) {
                console.log(response[i]._id);
                var id = response[i]._id;
                
                $scope.Account.Company.companyStaffIDs = [];
                $scope.Account.Company.companyContractorIDs = [];
                
                $http.put('/onboarding/' + id, $scope.Account.Company).success(function (response) {
                    console.log(response);
                });
            }
        });
    }
    
});

/*___________________________________________________________*/