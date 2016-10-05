
/*__________________appmain_______________________*/
app.controller('appmainController', function ($scope, $rootScope, $http, $location /*, appmainService*/) {
    
    $scope.date = currentDate();

    $scope.templates = [
        {
            name: "nav.html",
            url: "nav.html"
        }
    ]
    
    console.log("test for rootscope: ", $rootScope.currentUser);

    all_payroll = [];

    function inProgress(payroll){
      var period_from = payroll.Period_from.split("T")[0];
      var period_to = payroll.Period_to.split("T")[0];
      var currentDate = currentDateNum();        
        
      console.log(period_from + ", ", period_to + ", ", currentDate);

      if(compareYr(period_from.split("-")[0], period_to.split("-")[0])
        && compareMonth(period_from.split("-")[1], period_to.split("-")[1]), currentDate.split(" ")[1]
          && compareDays(period_from.split("-")[2], period_to.split("-")[2], currentDate.split(" ")[2])){
            return true;
      }
      return false;
    }

    function findPayrollInProgress(payrolls){
      for(payroll in payrolls){
        if(inProgress(payrolls[payroll])){
          $scope.payrollExist = true;
          $scope.payroll = payrolls[payroll];
          return;
        }    
      }
      $scope.payrollExist = false;

    }

    function getPayrolls(){
      $http.get('/payroll')
        .success(function(response){
          for(var k in response){
            if(response[k].CompanyID === $rootScope.currentUser._id){
              all_payroll.push(response[k]);
            }
          }
          findPayrollInProgress(all_payroll);
        });
    }

    function updatePageInfo(){
      $scope.CompanyName = $rootScope.currentUser.Company.Name;
      $scope.KRAPin = $rootScope.currentUser.Company.KRAPinno;
      $scope.NSSFno = $rootScope.currentUser.Company.NSSFno;
      $scope.NHIFno = $rootScope.currentUser.Company.NHIFno;

      $scope.noOfEmployees = $rootScope.currentUser.CompanyStaffIDs.length;
      $scope.noOfContractors = $rootScope.currentUser.CompanyContractorIDs.length;
    }

    function getUser(user){
        
        $http.get('/account/' + user._id)
          .success(function(user){
              $rootScope.currentUser = user;
              getPayrolls(); 
              updatePageInfo();
          })
    };

    $http.get('/loggedin')
      .success(function (user) {
        console.log("test for loggedin: ", user);
        getUser(user);       
      })
      .error(function (err){
        location.href="/";
    });

});


/*
app.factory('appmainService', function () {
   

});
*/

/*___________________________________________________________*/