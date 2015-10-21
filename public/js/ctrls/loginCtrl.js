/**
 * Created by angrycans on 15/6/23.
 */
/*

function loginCtrl() {


};

angular
    .module('AmsApp')
    .controller('loginCtrl', loginCtrl);
*/

angular
    .module('AmsApp').controller('loginCtrl', ['$rootScope', '$scope', '$state', '$translate'
    , '$window', '$document', '$timeout','$element','$http','$sessionStorage',
    function ($rootScope, $scope, $state, $translate, $window,
              $document, $timeout,$element,$http,$sessionStorage) {


        $scope.login = function () {
            //$scope.error="";
            $http({
                method:'POST',
                url:BASEINFO.ADDRESS+'/login',
            })
                .success(function(data, status, headers, config) {
                    $sessionStorage.user={name:"a",auth:1};
                    console.log("msgservice login ok data",data,$sessionStorage.user);


                    $state.go('app.dashboard');

                })
                .error(function(data, status, headers, config) {
                    //console.log(data,headers);

                    $scope.submitted = false;
                }
                );

        };

    }]);
