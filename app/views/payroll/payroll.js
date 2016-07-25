/*_______________________payroll:___________________*/

app.controller('payrollController', function ($scope, $http) {
    
    $scope.itemsInTable = [];

    $http.get('/payroll').success(function (response) {
        //console.log(response)

        $http.get('/loggedin')
            .success(function (user) {

                for (var k in response) {

                    if (response[k].CompanyID === user._id) {
                        $scope.itemsInTable.push(response[k]);
                        console.log($scope.itemsInTable);

                        $scope.totalPayroll = $scope.itemsInTable.length;

                        if ($scope.itemsInTable.InProgress == true){
                            $scope.inprogress = true;
                        }else{
                            $scope.inprogress = false;
                        }

                        if ($scope.itemsInTable.length > 0) {
                            $scope.payrollExist = true;
                        } else {
                            $scope.payrollExist = false;
                        }
                    }
                }
            });

    });
    
});

/*___________________________________________________________*/