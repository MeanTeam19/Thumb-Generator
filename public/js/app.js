(function () {
    'use strict';

    angular.module('ThumbGenerator.services', []);
    angular.module('ThumbGenerator.controllers', ['luegg.directives', 'ThumbGenerator.services']);
    angular.module('ThumbGenerator', ['ngAnimate', 'ThumbGenerator.services', 'ThumbGenerator.controllers']);
}());