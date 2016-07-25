/*______________________staff:______________________*/
/*
app.factory('staffService', function($scope, $http){

    var staff = function(callback){
        $http.get('/loggedin')
            .success(function (user) {
                callback(user);
            });
    };

    return {
        staff : staff
    }
});
*/

app.controller('staffController', function ($q, $scope, $http, $route) {
    
    $scope.itemsInTable = [];

    var addStaff = function () {

        $http.get('/staff').success(function (response) {

            $http.get('/loggedin')
            .success(function (user) {

            for (var k in response) {
                //console.log('i: ' + user.CompanyStaffIDs[i])
                // for (var j = 0; j < user.CompanyContractorIDs.length; j++) {
                //     console.log('j: ' + user.CompanyContractorIDs[j])

                    if (response[k].CompanyID === user._id) { //|| user.CompanyContractorIDs[j] === response[k]._id) {
                        $scope.itemsInTable.push(response[k]);
                        console.log($scope.itemsInTable);

                        $scope.totalStaff = $scope.itemsInTable.length;

                        if ($scope.itemsInTable.length > 0) {
                            $scope.staffExist = true;
                        } else {
                            $scope.staffExist = false;
                        }
                    }


            //}
            }
        });

        });
        //window.location.reload();
    };

        $scope.totalEmployees = function () {
            var total = 0;

            for (var i in $scope.itemsInTable) {
                if ($scope.itemsInTable[i].StaffType == 'Employee') {
                    total += 1;
                }
            }
            return total;
        };
            
        $scope.totalContractors = function () {
            var total = 0;
                
            for (var i in $scope.itemsInTable) {
                if ($scope.itemsInTable[i].StaffType == 'Contractor') {
                    total += 1;
                }
            }
            return total;
        };
            
        $scope.totalActive = function () {
            var total = 0;
                
            for (var i in $scope.itemsInTable) {
                if ($scope.itemsInTable[i].StaffStatus == 'Active') {
                    total += 1;
                }
            }
            return total;
        };
            
        $scope.totalInactive = function () {
            var total = 0;
                
            for (var i in $scope.itemsInTable) {
                if ($scope.itemsInTable[i].StaffStatus == 'Inactive') {
                    total += 1;
                }
            }
            return total;
        }       
   
        addStaff();
});

/*___________________________________________________________*/