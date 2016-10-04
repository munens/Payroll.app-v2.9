var app = angular.module("clientApp", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/appmain', {
            templateUrl: 'views/appmain/appmain.html',
            controller: 'appmainController',
            resolve: {
                loggedin : checkLoggedin
            }
        }).
            when('/agenda', {
            templateUrl: 'views/agenda/agenda.html',
            controller: 'agendaController'
        }).
            when('/payroll', {
            templateUrl: 'views/payroll/payroll.html',
            controller: 'payrollController',
            
        }).
            when('/staff', {
            templateUrl: 'views/staff/staff.html',
            controller: 'staffController'
        }).
            when('/companysettings', {
            templateUrl: 'views/company.settings/company.settings.html',
            controller: 'companySettingsController'
        }).
            when('/payrollreview/', {
            templateUrl: 'views/payroll.review/payroll.review.html',
            controller: 'payrollReviewController'
        }).
            when('/payrolladd', {
            templateUrl: 'views/payroll.add/payroll.add.html',
            controller: 'payrollAddController'
        }).
            when('/payroll/view/:id', {
            templateUrl: 'views/payroll.view/payroll.view.html',
            controller: 'payrollViewController'
        }).
            when('/payroll/edit/:id', {
            templateUrl: 'views/payroll.edit/payroll.edit.html',
            controller: 'payrollEditController'
        }).
            when('/payrollpay', {
            templateUrl: 'views/payroll.pay/payroll.pay.html',
            controller: 'payrollPayController'
        }). 
            when('/staffadd', {
            templateUrl: 'views/staff.add/staff.add.html',
            controller: 'staffAddController'
        }).
            when('/staffadd2', {
            templateUrl: 'views/staff.add2/staff.add2.html',
            controller: 'staffAdd2Controller'
        }).
            when('/staffchoose', {
            templateUrl: 'views/staff.choose/staff.choose.html',
            controller: 'payrollReviewController'
        }).
            when('/staff/view/:id', {
            templateUrl: 'views/staff.view/staff.view.html',
            controller: 'staffViewController'
        }).
            when('/staffedit/:id', {
            templateUrl: 'views/staff.edit/staff.edit.html',
            controller: 'staffEditController'
        }).
            when('/paymentadd', {
            templateUrl: 'views/payment.add/payment.add.html',
            controller: 'payrollAddController'
        }).
            when('/onboarding', {
            templateUrl: 'views/onboarding/onboarding.html',
            controller: 'onBoardingController'
        }).
            when('/signup', {
            templateUrl: 'views/signup/sign-up.html',
            controller: 'signUpController'
        }).
            when('/', {
            templateUrl: 'views/login/log-in.html',
            controller: 'loginController'
        }).
            otherwise({//otherwise default page is:
            redirectTo: '/'
        });

        //$httpProvider.
        //interceptors
        //.push(function ($q, $location) {
            
        //    return {
                
        //        response: function (response) {
        //            return response;
        //        },
        //        // if there are any errors-specifically of '401', open the login page:
        //        responseError: function (response) {
        //            if (response.status === 401) {
        //                $location.url('/login');
        //            }
        //            return $q.reject(response);
        //        }
        //    }
        //});

    }]);


// this function is called when i try and come back and access pages that have not been logged in.
var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    
    // make asynchronous call to user.
    var deffered = $q.defer();
    
    $http.get('/loggedin')
    .success(function (user) {
        
        console.log('checkLoggedin');
        console.log(user);
        
        //rootScope allows one to access the scope not only of this controller but of all controllers.
        // this is good because any place onthe html that has {{errorMessage}}, will have this value.
        $rootScope.errorMessage = null;
        
        //user is auhenticated:
        if (user !== '0') {
            //again, any value on the html pages of {{currentUser}} , can take in the value of the 
            //, using $rootScope. 
            $rootScope.currentUser = user;
            $location.url('/appmain');
            deffered.resolve();
        }
        //user is not authenticated:
        else {
            $rootScope.errorMessage = 'You need to log in'; // message passd on to {{error Message}]
            deffered.reject(); // cancel asynchronous call to server.
            $location.url('/');
        }
    });
    
    return deffered.promise;
};

app.factory('SecurityService', function ($http, $location, $rootScope) {
    
    // When one clicks on login, we go to the server where we give it our
    // username and password - if valid then the client will be told to provide a cookie. 
    // Since this cookie exists, the client can always know if it is logged in or not.  
    //  - When an asychronous call is made to the server with '/login', a user object is passed to it as that in 
    //    which the user has typed. The server can then verify if this user carrying the username and password is 
    //    correct - probably by using db.
    var login = function (user, callback) {
        $http.post('/login', user).
        success(function (user) {
            //If the username and password are correct then the currentUser variable that is applied under $rootScope
            // can then carry the coorect value of the username and password that was taken from the server. 
            $rootScope.currentUser = user;
            //callback here is what is returned.
            callback(user);
            //$location.url('/appmain');
        }).
        error(function(err){
            $rootScope.loginAuth = true;
            $rootScope.error = err;
            //$location.url('/appmain');
        });
    };
    
    var logout = function (callback) {
        $http.post('/logout')
        .success(function () {
            $rootScope.currentUser = null;
            
            callback();
        })
    };
    
    return {
        login : login,
        logout : logout
    };
        
});



/*_______________________login___________________*/

app.controller('loginController', function ($scope, $rootScope, $location, $http, SecurityService) {
    
    
    $scope.changeLoginEmpty = function(user){
        if(user.username == "" || user.password == ""){
            $scope.loginEmpty = false;
        }
    }
    

    $scope.changeLoginAuth = function(){
        $rootScope.loginAuth = false;
    }

    $scope.login = function (user) {
        
        if(user.username !== "" || user.password !== ""){
            SecurityService.login(user, function (response) {
                console.log(response);
                $location.url('/appmain');
            });
        } else {
            $scope.loginEmpty = true;
        }


    };   
    
});

/*___________________________________________________________*/


/*_______________________agenda:____________________*/
app.controller('agendaController', function ($scope) { });

/*___________________________________________________________*/


/*_______________________sign-up:___________________*/

app.controller('signUpController', function ($scope, $http) {
    
    $scope.empty_field = false;
    $scope.account_exist = false;
    
    function changeAccountExist(){
      $scope.account_exist = false;
    }

    function accountExist(account, response){
     
      if(response === 0){
      
        $http.post('/signup', account)
          .success(function (response) {
            if (response != null) {
              location.href="#/onboarding";
            }
        });
      } else {
        $scope.account_exist = true;
      }

    }

    $scope.update = function (account) {
        
        account.CompanyStaffIDs = [];
        account.CompanyContractorIDs = [];
        account.CompanyPayrollIDs = [];

        if(account.FirstName === "" || account.LastName === "" 
            || account.Phoneno === "" || account.Email === "" 
              || account.username === "" || account.password == ""){
                $scope.empty_field = true;
        } else {
            $http.post('/account-exist', account)
                .success(function(response){
                    $scope.empty_field = false;
                    accountExist(account, response);    
            })
        }


    }   
});

/*___________________________________________________________*/



/*_______________________payrolledit:___________________*/
app.controller('payrollEditController', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    var route = '/payroll/view/' + $routeParams.id;
    
    $http.get('/payrollreview').success(function (response) {
        $scope.staff = response;
        var numberOfStaff = $scope.staff.length;
        $scope.numberOfStaff = numberOfStaff;
    });

    $http.get('/staff').success(function (response) {
        $scope.staff = response;
        
        if (response.length > 0) {
            $scope.staffExist = true;
        } else {
            $scope.staffExist = false;
        }
    });
    
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
        for (var i = 0; i < $scope.staff.length; i++) {
            var s = $scope.staff[i];
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

    $http.get(route).success(function (response) {
        $scope.payroll = response;
        console.log(response);
        
        $scope.pay = response.Payment;
        $scope.due = response.dueDate;
        $scope.Tax = response.Tax;

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
                
            }
                                
        });

    });

    $scope.remove = function (id) {
        $http.delete(route);
    };

});

/*___________________________________________________________*/



/*_______________________staffchoose:___________________*/
app.controller('staffChooseController', function ($scope, $http, $routeParams) {
    
    $http.get('/staff').success(function (response) {
        $scope.staff = response;
        if (response.length > 0) {
            $scope.staffExist = true;
        } else {
            $scope.staffExist = false;
        }
    });


});

/*___________________________________________________________*/



/*******************************************Date/Time***********************************************/

var currentDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();  
   
    if (mm === 1) {
        mm = "January";
    } else if (mm === 2) {
        mm = "February"; 
    }else if (mm === 3) {
        mm = "March";
    }else if (mm === 4) {
        mm = "April";
    }else if (mm === 5) {
        mm = "May";
    }else if (mm === 6) {
        mm = "June";
    }else if (mm === 7) {
        mm = "July";
    }else if (mm === 8) {
        mm = "August";
    } else if (mm === 9) {
        mm = "Septmber";
    } else if (mm === 10) {
        mm = "October";
    } else if (mm === 2) {
        mm = "November";
    } else {
        mm = "December";
    }
    
    return today = dd + ' ' + mm + ' ' + yyyy;
};

/*******************************************Calculators***********************************************/
var tier1 = 10164;
var tier2 = 9576;
var tier3 = 9576;
var tier4 = 9576;

var total1 = 0.1 * tier1;
var total2 = 0.15 * tier2;
var total3 = 0.2 * tier3;
var total4 = 0.25 * tier4;

var personalRelief = 1162;
var insuranceRelief = 0;

//var taxablePay = grossPay - 200;


var nhif = function nhifCalc(num) {
    if (num >= 0 && num <= 5999) {
        var a1 = 150;
        return a1;
    } else if (num >= 6000 && num <= 7999) {
        var a2 = 300;
        return a2;
    } else if (num >= 8000 && num <= 11999) {
        return 400;
    } else if (num >= 12000 && num <= 14999) {
        return 500;
    } else if (num >= 15000 && num <= 19999) {
        return 600;
    } else if (num >= 20000 && num <= 24999) {
        return 750;
    } else if (num >= 25000 && num <= 29999) {
        return 850;
    } else if (num >= 30000 && num <= 34999) {
        return 900;
    } else if (num >= 35000 && num <= 39999) {
        return 950;
    } else if (num >= 40000 && num <= 44999) {
        return 1000;
    } else if (num >= 45000 && num <= 49999) {
        return 1100;
    } else if (num >= 50000 && num <= 59999) {
        return 1200;
    } else if (num >= 60000 && num <= 69999) {
        return 1300;
    } else if (num >= 70000 && num <= 79999) {
        return 1400;
    } else if (num >= 80000 && num <= 89999) {
        return 1500;
    } else if (num >= 90000 && num <= 99999) {
        return 1600;
    } else {
        return 1700;
    }

};

var nssf1N = function nssfCalc1N(num) {
    
    if (num <= 6000) {
        return 0.06 * num;

    } else {
        return 360;
    }
};

var nssf2N = function nssfCalc2N(num) {
    
    if (num > 6000 && num <= 18000) {
        return 0.06 * (num - 6000);

    } else if (num > 18000) {
        return 720;
    } else {
        return 0;
    }
    
};

var payeN = function payeCalcN(grossPay) {
    
    var bal1n = (grossPay - nssf1N(grossPay) - nssf2N(grossPay)) - tier1;
    var bal2n = bal1n - tier2;
    var bal3n = bal2n - tier3;
    var bal4n = bal3n - tier4;
    var balfinaln = 0.3 * bal4n;
    
    if ((grossPay - nssf1N(grossPay) - nssf2N(grossPay)) <= tier1) {
        
        var paye0 = 0;
        return paye0;

    } else if (bal1n <= tier2) {
        
        var paye1n = total1 + 0.15 * (bal1n);
        var PAYEdue1n = paye1n - personalRelief - insuranceRelief;
        
        if (PAYEdue1n < 0) {
            
            PAYEdue1n = 0;
            return PAYEdue1n;
    
        } else {
            return PAYEdue1n;
        }

    } else if (bal2n <= tier3) {
        
        var paye2n = total2 + total1 + 0.2 * (bal2n);
        var PAYEdue2n = paye2n - personalRelief - insuranceRelief;
        return PAYEdue2n;

    } else if (bal3n <= tier4) {
        
        var paye3n = total3 + total2 + total1 + 0.25 * (bal3n);
        var PAYEdue3n = paye3n - personalRelief - insuranceRelief;
        return PAYEdue3n;

    } else {
        
        var paye4n = total4 + total3 + total2 + total1 + balfinaln;
        var PAYEdue4n = paye4n - personalRelief - insuranceRelief;
        return PAYEdue4n;

    }
};

var netPayN = function netPayCalc(grossPay) {
    
    var netPay = grossPay - payeN(grossPay) - nssf1N(grossPay) - nssf2N(grossPay) - nhif(grossPay);
    
    return netPay;
  
  
};