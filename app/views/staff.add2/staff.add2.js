/*______________________staffAdd:___________________*/

app.controller('staffAdd2Controller', function ($scope, $http) {
    
    var staffids = [];
    var contractorids = [];
    
    $scope.addStaff = function () {
        
        $http.get('/loggedin')
        .success(function (user) {
            
            $scope.s.PAYE = payeN($scope.s.GrossPay);
            $scope.s.NHIF = nhif($scope.s.GrossPay);
            $scope.s.NSSF = nssf1N($scope.s.GrossPay) + nssf2N($scope.s.GrossPay);
            $scope.s.Bonus = 0;
            $scope.s.NetPay = netPayN($scope.s.GrossPay);
            
            $scope.s.companyID = user._id;
            
            user.Company.companyStaffIDs = staffids;
            user.Company.companyContractorIDs = contractorids;
            
            $http.post('/staff', $scope.s)
            .success(function (response) {
                
                console.log('staff added');
                
                if (response.StaffType == 'Contractor') {
                    contractorids.push($scope.s._id);
                }
                staffids.push($scope.s._id);
                
                user.Company.companyStaffIDs = staffids;
                user.Company.companyContractorIDs = contractorids;
                
                $http.put('/onboarding/' + id, user.Company).success(function (response) {
                    console.log(response);
                });

            });
        });
    };
});

/*___________________________________________________________*/