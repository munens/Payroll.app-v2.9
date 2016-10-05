/*______________________payrollAdd:_________________*/

app.controller('payrollAddController', function ($scope, $http, payrollService) {

    $scope.items = [];

    $http.get('/payrollreview').success(function (response) {

        $http.get('/loggedin')
        .success(function (user) {

            for (var k in response) {

                if (response[k].CompanyID === user._id) { //|| user.CompanyContractorIDs[j] === response[k]._id) {
                    $scope.items.push(response[k]);
                    console.log($scope.items);

                    $scope.numberOfStaff = $scope.items.length;

                    if ($scope.items.length > 0) {
                        $scope.staffExist = true;
                    } else {
                        $scope.staffExist = false;
                    }
                }
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
    
    var itemsToAdd = [];
    
    var updateSelected = function (action, id) {
        
        if (action === 'add' && itemsToAdd.indexOf(id) === -1) {
            itemsToAdd.push(id);
        }
        
        if (action === 'remove' && itemsToAdd.indexOf(id) !== -1) {
            itemsToAdd.splice(itemsToAdd.indexOf(id), 1);
        }
        console.log(itemsToAdd);
    }
    
    //console.log(itemsToAdd);
    
    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.items.length; i++) {
            var s = $scope.items[i];
            updateSelected(action, s._id);
        }
        console.log(itemsToAdd);
    };
    
    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
        console.log(itemsToAdd);
    };
    
    $scope.isSelected = function (id) {
        return itemsToAdd.indexOf(id) >= 0;
    };
    
    $scope.isSelectedAll = function () {
        //return itemsToAdd.length === $scope.staff.length;
    };
    
    $scope.itemsInTable = [];
    
    $scope.updateTable = function () {
        var item = {
            Name: $scope.Name,
            Account: $scope.Account,
            Amount: $scope.Amount,
            Deadline: $scope.Deadline,
        }
        
        $scope.itemsInTable.push(item);
        console.log($scope.itemsInTable);
        
        $scope.Name = "";
        $scope.Account = "";
        $scope.Amount = "";
        $scope.Deadline = "";
        
    };
    
    $scope.removeItem = function (index) {
        $scope.itemsInTable.splice(index, 1);
    };
    
    $scope.totalGP = function () {
        
        var totalgp = 0;
        angular.forEach($scope.items, function (s) {
            totalgp += s.GrossPay;
        });
        
        return totalgp;
    };
    
    
    $scope.totalBonus = function () {
        var totalbonus = 0;
        angular.forEach($scope.items, function (s) {
            totalbonus += s.Bonus;
        });
        return Number(totalbonus);
    };
    
    
    $scope.totalPAYE = function () {
        var totalpaye = 0;
        
        angular.forEach($scope.items, function (s) {
            totalpaye += s.PAYE;
        });
        return totalpaye;
    };
    
    $scope.totalNHIF = function () {
        var totalnhif = 0;
        
        angular.forEach($scope.items, function (s) {
            totalnhif += s.NHIF;
        });
        return totalnhif;
    };
    
    $scope.totalNSSF = function () {
        var totalnssf = 0;
        
        angular.forEach($scope.items, function (s) {
            totalnssf += s.NSSF;
        });
        return totalnssf;
    };
    
    $scope.totalNetPay = function () {
        var totalnetpay = 0;
        
        angular.forEach($scope.items, function (s) {
            totalnetpay += s.NetPay;
        });
        return totalnetpay;
    };
    
    $scope.totalTax = function () {
        var totaltax = $scope.totalPAYE() + $scope.totalNHIF() + $scope.totalNSSF();
        
        return totaltax;
    };
    
    
    $scope.update = function () {

        $http.get('/loggedin')
            .success(function (user) {

                $scope.p.Payment = $scope.itemsInTable;

                $scope.p.dueDate = {
                    PAYEdue: $scope.PAYE.date,
                    NHIFdue: $scope.NHIF.date,
                    NSSFdue: $scope.NSSF.date
                }

                $scope.p.Tax = {
                    totalPAYE: $scope.totalPAYE(),
                    totalNHIF: $scope.totalNHIF(),
                    totalNSSF: $scope.totalNSSF(),
                    totalTax: $scope.totalTax()
                };

                $scope.p.CompanyID = user._id;

                $scope.p.EmployeeIDs = itemsToAdd;

                var d1 = new Date($scope.p.Period_from), // 10:09 to
                    d2 = new Date($scope.p.Period_to);

                var currentDate = new Date();
                var currentDateISO = currentDate.toISOString();
                console.log(currentDateISO);
                if( (currentDateISO - d1)>= 0 && (d2 - currentDateISO) <= 0){
                    $scope.p.InProgress = true;
                }else{
                    $scope.p.InProgress = false;
                }

                $http.post('payrolladd', $scope.p)
                    .success(function (response) {
                        console.log("1: " + response);

                        payrollService.addFields(response);
                    });
            });

    };
    

    

});

app.factory('payrollService', function () {
    
    var fields = [];
    
    var addFields = function (val) {
        console.log("2: " + val);
        return fields.push(val);
    };
    
    var getFields = function () {
        return fields;
    }
    
    return {
        addFields : addFields,
        getFields : getFields
    };

});

/*___________________________________________________________*/