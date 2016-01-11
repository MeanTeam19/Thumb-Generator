(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('UsersController', [users]);

    function users() {
        var vm = this;
        vm.isFirstNameLessThan = function (len) {
            var name = vm.user && vm.user.firstName || '';
            return name.length < len;
        };

        vm.isLastNameLessThan = function (len) {
            var name = vm.user && vm.user.lastName || '';
            return name.length < len;
        };

        vm.isUsernameLessThan = function (len) {
            var name = vm.user && vm.user.username || '';
            return name.length < len;
        };

        vm.isPasswordLessThan = function (len) {
            var pass = vm.user && vm.user.password || '';
            return pass.length < len;
        };

        vm.doPasswordsMatch = function () {
            var pass = vm.user && vm.user.password || '',
                confPass = vm.user && vm.user.confirmPassword || '';
            return pass === confPass;
        };

        vm.isRegistrationFormValid = function (len) {
            return !(vm.isFirstNameLessThan(len) || vm.isLastNameLessThan(len) || vm.isUsernameLessThan(len) || vm.isPasswordLessThan(len) || !vm.doPasswordsMatch());
        };

        vm.isLoginFormValid = function (len) {
            return !(vm.isUsernameLessThan(len) || vm.isPasswordLessThan(len));
        };
    }
}());