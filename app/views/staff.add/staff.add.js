/*______________________staffAdd:___________________*/

app.controller('staffAddController', function ($scope, $http, $location) {
    
    var staffids = [];
    var contractorids = [];
    
    $scope.addStaff = function () {
        
            $scope.s.PAYE = payeN($scope.s.GrossPay);
            $scope.s.NHIF = nhif($scope.s.GrossPay);
            $scope.s.NSSF = nssf1N($scope.s.GrossPay) + nssf2N($scope.s.GrossPay);
            $scope.s.Bonus = 0;
            $scope.s.NetPay = netPayN($scope.s.GrossPay);
             
            //$scope.s.companyID = user._id;
                      
            //user.Company.companyStaffIDs = staffids;
            //user.Company.companyContractorIDs = contractorids;
            
            $http.post('/staff', $scope.s)
            .success(function (response) {
                
                console.log('response' + response);

                $http.get('/loggedin')
                    .success(function (user) {

                        console.log('user' + user);

                        //staffids.push(response._id);
                var ids = {}

                if (response.StaffType === 'Employee') {
                    ids.companyStaffIDs = response._id;
                } else {
                    ids.companyContractorIDs = response._id;
                }

                console.log(ids);
                
                response.CompanyID = user._id;
                
                $http.put('/addids/' + user._id, ids).success(function (response) {
                    console.log(response);
                });

                $http.put('/staff/edit/' + response._id, response).success(function (request, response) {
                });

                $location.href="";

            });       
                /*$http.get('/loggedin')
                    .success(function (user) {




                        if (response.StaffType == 'Contractor') {
                            user.Company.companyContractorIDs = contractorids.push(response._id);
                        }
                        
                        user.Company.companyStaffIDs = staffids.push(response._id);


                        console.log("1a: " + staffids);
                        console.log("1b: " + user.Company.companyStaffIDs);

                        console.log("2a: " + contractorids);
                        console.log("2b: " + user.Company.companyContractorIDs);

                        $http.post('/onboarding/' + user._id, user.Company).success(function (response) {
                            console.log(response);
                        });
                    })*/
            });
    };

    

});

/*___________________________________________________________*/