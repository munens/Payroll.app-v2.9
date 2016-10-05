
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

    function updatePageInfo(){
        $scope.CompanyName = $rootScope.currentUser.Company.Name;
        $scope.KRAPin = $rootScope.currentUser.Company.KRAPinno;
        $scope.NSSFno = $rootScope.currentUser.Company.NSSFno;
        $scope.NHIFno = $rootScope.currentUser.Company.NHIFno;

        $scope.noOfEmployees = $rootScope.currentUser.CompanyStaffIDs.length;
        $scope.noOfContractors = $rootScope.currentUser.CompanyContractorIDs.length;
    };

    function getUser(user){
        
        $http.get('/account/' + user._id)
          .success(function(user){
              $rootScope.currentUser = user;
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