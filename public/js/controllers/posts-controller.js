(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('PostsController', [posts]);

    function posts() {
        var vm = this;
        vm.asd = 'qwe'
        
        vm.isPostMoreThan = function(len) {
            var text = vm.post.text || '';
            return text.length > len;
        }
        
        vm.isPostLongerThan = function(len) {
            var text = vm.post.text || '';
            return text.length < len;
        }
    }
} ());