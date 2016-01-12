(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('ChatController', ['$scope', 'chat', function ($scope, chat) {

        $scope.messages = [];
        chat.on('chatMessage', function (message) {
            $scope.messages.push(message);
        });

        $scope.sendMessage = function () {
            var message = {
                text: $scope.messageText
            };

            chat.emit('chatMessage', message);

            $scope.messageText = '';
        };

        $scope.$on('$destroy', function () {
            chat.removeListener('chatMessage');
        });
    }]);
}());