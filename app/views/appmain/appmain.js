
/*__________________appmain_______________________*/
app.controller('appmainController', function ($scope, $rootScope, $http, $location /*, appmainService*/) {
    
    $http.get('/loggedin')
    .success(function (user) {
        console.log(user);

        $scope.CompanyName = user.Company.Name;
        $scope.KRAPin = user.Company.KRAPinno;
        $scope.NSSFno = user.Company.NSSFno;
        $scope.NHIFno = user.Company.NHIFno;

        $scope.noOfEmployees = user.CompanyStaffIDs.length;
        $scope.noOfContractors = user.CompanyContractorIDs.length;

    });
    


    $scope.date = currentDate();
    
    
    
        
    $scope.templates = [
        {
            name: "nav.html",
            url: "nav.html"
        }
    ]
    
    
    
    //$http.get('accountID').success(function (response) {
        
    //    for (var i = 0; i < 1; i++) {
    //        console.log(response[i]._id);
    //        var id = response[i]._id;
            
    //        $http.get('/appmain/' + id)
    //        .success(function (response) {
    //            //$scope.CompanyName = response.Company.Name;
    //            $scope.KRAPin = response.Company.KRAPinno;
    //            $scope.NSSFno = response.Company.NSSFno;
    //            $scope.NHIFno = response.Company.NHIFno;

    //        });
    //    }
    //});


    

});


/*
app.factory('appmainService', function () {
   

});
*/

/*___________________________________________________________*/