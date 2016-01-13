(function () {
    'use strict';

    angular.module('ThumbGenerator.services', []);
    angular.module('ThumbGenerator.controllers', ['ThumbGenerator.services', 'luegg.directives']);
    angular.module('ThumbGenerator', ['ThumbGenerator.services', 'ThumbGenerator.controllers']);
}());