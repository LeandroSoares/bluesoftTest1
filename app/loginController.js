(function() {
    'use strict';

    angular.module('iBuy').controller('loginController', LoginController);

    function LoginController($scope, $rootScope, $location) {
        //parse controller scope reference
        var _self = this;

        // class to animate by condition
        _self.class = 'on';
        //var to check save if is something wrong
        _self.wrong = false;

        // console.log($rootScope);
        //method to check login username and password
        _self.$validateUser = function() {
            // saves the kind of error;
            var allOk = validateUser($scope.user.name, $scope.user.pass);

            if (allOk.user && allOk.pass) {
                $rootScope.logged = true;
                $location.path("/");
                _self.wrong = false;
            } else {
                _self.wrong = true;
                _self.class = 'on error';
                _self.errorMessage = allOk.user ? 'Password incorreto, coloque: ' + $scope.userLoginData.pass : 'Username incorreto, coloque: ' + $scope.userLoginData.user;
            }
            return !_self.wrong;
        }

        _self.validateUser = validateUser;

        function validateUser(username, password) {
            var allOk = {
                user: false,
                pass: false
            }

            console.log(username, '$scope.userLoginData.user', $scope.userLoginData)
            //cheking user
            if (username == $scope.userLoginData.name) {
                allOk.user = true;
            }

            console.log(password, $scope.userLoginData.pass)
            //cheking pass
            if (password == $scope.userLoginData.pass) {
                allOk.pass = true;
            }
            return allOk;
        }

    }

})();