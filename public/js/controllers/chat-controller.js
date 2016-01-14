(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('ChatController', ['$scope', 'chat', function ($scope, chat) {
        $scope.username = null;
        chat.on('username', function (username) {
            $scope.username = username;
        });

        $scope.messages = [];

        chat.on('oldMessages', function (oldMessages) {
            $scope.messages = oldMessages;
        });

        chat.on('chatMessage', function (message) {
            $scope.messages.push(message);
        });

        $scope.messageText = '';
        $scope.sendMessage = function () {
            if (/\S/.test($scope.messageText) === false) {
                return;
            }

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