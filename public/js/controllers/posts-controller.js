(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('PostsController', [posts]);

    function posts() {
        var vm = this;
        vm.asd = 'qwe'

        vm.isPostMoreThan = function (len) {
            var post = vm.post || {};
            var text = post.text || '';
            return text.length > len;
        }
    }
} ());