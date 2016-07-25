/*_______________________payrollview:___________________*/

app.controller('payrollViewController', function ($scope, $http, $routeParams) {

    $scope.id = $routeParams.id;
    var route = '/payroll/view/' + $routeParams.id;
    
    $http.get(route).success(function (response) {
        $scope.payroll = response;
        console.log(response);
        
        $scope.pay = response.Payment;
        $scope.due = {
            NHIFdue: moment(response.dueDate.NHIFdue).format("DD/MM/YYYY"),
            PAYEdue: moment(response.dueDate.PAYEdue).format("DD/MM/YYYY"),
            NSSFdue: moment(response.dueDate.NSSFdue).format("DD/MM/YYYY")
        }
        //console.log("NHIF Due date: " + moment(response.dueDate.NHIFdue).format("LLL"));
        
        $scope.itemsInTable = [];
        
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
    
    $scope.remove = function (id) {
        $http.delete(route);
        
        var ids = {};
        
        ids.PayrollID = id;
        
        console.log(ids);
        
        $http.get('/loggedin')
            .success(function (user) {
            $http.put('/deleteid/' + user._id, ids);
        });

    };

});

/*___________________________________________________________*/