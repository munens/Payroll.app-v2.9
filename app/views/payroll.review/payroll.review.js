/*______________________payrollReview:______________*/

app.controller('payrollReviewController', function ($scope, $http, $routeParams) {
    
    $scope.id = $routeParams.id;
    var route = '/payrollreview/' + $routeParams.id;
    
    $http.get('/staff').success(function (response) {
        $scope.staff = response;
        
        if (response.length > 0) {
            $scope.staffExist = true;
        } else {
            $scope.staffExist = false;
        }
    });


    /*
    $http.get('/staff').success(function (response) {
        $scope.staff = response;
        //console.log(response);
        var listofIds
        for (var i in $scope.staff) {
            var id = $scope.staff[i]._id;
            
        }
    });
    */

    //$scope.changeVal = function (val) {
        
    //    $http.put('/payrollreview3/' + val._id, val)
    //    .success(function (request, response) {
    //        console.log('items changed!');
    //    });
    //};

    $http.get('/latestID').success(function (response) {
        for (var i = 0; i < 1; i++) {
            console.log(response[i]._id);
            var id = response[i]._id;
            
            
            $http.get('/payrollreview/' + id).success(function (response) {
                $scope.payroll = response;
                console.log(response);
                
                $scope.pay = response.Payment;
                $scope.due = response.dueDate;


                var total = 0;
                for (var i in $scope.payroll.Payment) {
                    var payment = $scope.payroll.Payment[i];
                    console.log(payment);
                    total += payment.Amount;
                }
                
                $scope.itemsInTable = [];
                
                $scope.TotalPayment = total;
                $scope.payroll.TotalPayment = total;
                
                $http.get('/staff').success(function (response) {
                    
                    for (var i in $scope.payroll.EmployeeIDs) {
                        
                        var id1 = $scope.payroll.EmployeeIDs[i];
                        
                        for (var j in response) {
                            var id2 = response[j]._id;
                            
                            if (id1 === id2) {
                                $scope.itemsInTable.push(response[j]);
                            }

                        }
                        $scope.numberOfStaff = $scope.itemsInTable.length;
                    }
                                
                });

                   

            });
        }
    });
    
    //$scope.removeItem = function () {
    //    $http.get('/latestID').success(function (response) {
    //        for (var i = 0; i < 1; i++) {
    //            console.log(response[i]._id);
    //            var id = response[i]._id;
    
    //            $http.delete('/payrollreview/' + id)
    //            .success(function (response) {
    
    //            });
    
    //        };
    //    });
    //}
    
    $scope.updateFields = function (val) {
        
        var paye = payeN(Number(val.GrossPay) + Number(val.Bonus));
        var netpay = netPayN(Number(val.GrossPay) + Number(val.Bonus));
        
        val.PAYE = paye;
        val.NetPay = netpay;
        
        $http.put('/payrollreview/' + val._id, val)
    .success(function (request, response) {
            console.log('items added!');
        });
    };
    
    
    $scope.totalGP = function () {
        
        var totalgp = 0;
        angular.forEach($scope.itemsInTable, function (s) {
            totalgp += s.GrossPay;
        });
        
        return totalgp;
    };
    
    
    $scope.totalBonus = function () {
        var totalbonus = 0;
        angular.forEach($scope.itemsInTable, function (s) {
            totalbonus += s.Bonus;
        });
        return Number(totalbonus);
    };
    
    
    $scope.totalPAYE = function () {
        var totalpaye = 0;
        
        angular.forEach($scope.itemsInTable, function (s) {
            totalpaye += s.PAYE;
        });
        return totalpaye;
    };
    
    $scope.totalNHIF = function () {
        var totalnhif = 0;
        
        angular.forEach($scope.itemsInTable, function (s) {
            totalnhif += s.NHIF;
        });
        return totalnhif;
    };
    
    $scope.totalNSSF = function () {
        var totalnssf = 0;
        
        angular.forEach($scope.itemsInTable, function (s) {
            totalnssf += s.NSSF;
        });
        return totalnssf;
    };
    
    $scope.totalNetPay = function () {
        var totalnetpay = 0;
        
        angular.forEach($scope.itemsInTable, function (s) {
            totalnetpay += s.NetPay;
        });
        return totalnetpay;
    };
    
    $scope.totalTax = function () {
        var totaltax = $scope.totalPAYE() + $scope.totalNHIF() + $scope.totalNSSF();
        
        return totaltax;
    };
    
    
    $scope.update = function () {
        
        $http.get('/latestID').success(function (response) {
            for (var i = 0; i < 1; i++) {
                console.log(response[i]._id);
                var id = response[i]._id;
                
                var ids = {};
                ids.PayrollID = id;

                $http.get('/loggedin')
                    .success(function (user) {
                    
                    console.log(ids);
                    
                    $http.put('/addids/' + user._id, ids).success(function (response) {
                        console.log(response);
                    });

                });

                $http.put('/payrollreview2/' + id, $scope.payroll)
                .success(function (request, response) {
                    console.log('items changed!');
                });
            
            }
        });
    }

});



/*___________________________________________________________*/


