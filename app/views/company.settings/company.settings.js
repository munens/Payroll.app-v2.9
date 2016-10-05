/*______________________companySettings:____________*/

app.controller('companySettingsController', function ($rootScope, $scope, $http) {


    function changeCompanyInfo() {
        console.log($scope.Account);
        $http.put('/onboarding/' + $rootScope.currentUser._id, $scope.Account.Company)
            .success(function (response) {
                location.href="#/appmain";
            });
    }

    function updatePage(user){
         $http.get('/account/' + user._id)
          .success(function(user){
              $rootScope.currentUser = user;
              $scope.Account = user;
          })
    }
    /*
    function getUser(user){
        
        $http.get('/account/' + user._id)
          .success(function(user){
              changeCompanyInfo()
          })
    };*/

    $http.get('/loggedin')
      .success(function (user) {
        updatePage(user);
      });

    $scope.update = function () {
        changeCompanyInfo();
    }

    

});

/*___________________________________________________________*/
