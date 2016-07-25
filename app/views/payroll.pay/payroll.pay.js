/*_______________________payrollpay:___________________*/

app.controller('payrollPayController', function ($scope, $http, $routeParams) {
    
    
    $http.get('/staff').success(function (response) {
        $scope.staff = response;
        
        if (response.length > 0) {
            $scope.staffExist = true;
        } else {
            $scope.staffExist = false;
        }
    });
    
    $scope.totalGP = function () {
        
        var totalgp = 0;
        angular.forEach($scope.staff, function (s) {
            totalgp += s.GrossPay;
        });
        
        return totalgp;
    };
    
    
    $http.get('/latestID').success(function (response) {
        for (var i = 0; i < 1; i++) {
            console.log(response[i]._id);
            var id = response[i]._id;
            
            
            $http.get('/payrollreview/' + id).success(function (response) {
                $scope.payroll = response;
                
                $scope.pay = response.Payment;
                $scope.due = moment(response.dueDate).format("LLL");
                $scope.tax = response.Tax;
                
                var total = 0;
                for (var i in $scope.payroll.Payment) {
                    console.log($scope.payroll.Payment[i]);
                    total += $scope.payroll.Payment[i];
                }
                
                $scope.itemsInTable = [];
                
                $scope.totalpayment = total;
                $scope.payroll.Payment.totalPayment = total;
                
                $http.get('/staff').success(function (response) {
                    
                    for (var i in $scope.payroll.EmployeeIDs) {
                        
                        var id1 = $scope.payroll.EmployeeIDs[i];
                        
                        for (var j in response) {
                            var id2 = response[j]._id;
                            
                            if (id1 === id2) {
                                $scope.itemsInTable.push(response[j]);
                            }

                        }
                    }
                    $scope.numberOfStaff = $scope.itemsInTable.length;
                });

                             
            });
        }
    });
});

/*___________________________________________________________*/




