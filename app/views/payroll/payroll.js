/*_______________________payroll:___________________*/

app.controller('payrollController', function ($rootScope, $scope, $http) {
    
    $scope.itemsInTable = [];

    $scope.inProgress = function(payroll){
        console.log(payroll);
        var period_from = payroll.Period_from.split("T")[0];
        var period_to = payroll.Period_to.split("T")[0];
        var currentDate = currentDateNum();        
        
        console.log(period_from + ", ", period_to + ", ", currentDate);

        //console.log(compareYr(period_from.split("-")[0], period_to.split("-")[0], currentDate.split(" ")[2]));
        //console.log(compareMonth(period_from.split("-")[1], period_to.split("-")[1], currentDate.split(" ")[1]));

        if(compareYr(period_from.split("-")[0], period_to.split("-")[0], currentDate.split(" ")[2] )
           && compareMonth(period_from.split("-")[1], period_to.split("-")[1], currentDate.split(" ")[1])){       
            return true;
        }
        return false;
    }

    

    function getPayrollLength(items){
        $scope.totalPayroll = items.length;
        items.length > 0 ? $scope.payrollExist = true : $scope.payrollExist = false; 
    }

    function getPayroll(){
        $http.get('/payroll')
          .success(function(response){
            for(var k in response){
              if(response[k].CompanyID === $rootScope.currentUser._id){
                $scope.itemsInTable.push(response[k]);
              }
            }
            getPayrollLength($scope.itemsInTable)

          });
    }

    function getUser(user){
      $http.get('/account/' + user._id)
        .success(function(user){
          $rootScope.currentUser = user;
          getPayroll();
      })
    }

    $http.get('/loggedin')
      .success(function (user) {
          getUser(user);
      })

    
});

/*___________________________________________________________*/