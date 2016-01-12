(function () {
    'use strict';

    angular.module('ThumbGenerator.controllers').controller('ChatController', ['chat', function (chat) {
        var vm = this;

        vm.messages = [];
        console.log(vm);
        chat.on('chatMessage', function (message) {
            vm.messages.push(message);
        });

        vm.sendMessage = function () {
            var message = {
                text: vm.messageText
            };

            chat.emit('chatMessage', message);

            vm.messageText = '';
        };

        vm.$on('$destroy', function () {
            chat.removeListener('chatMessage');
        });
    }]);
}());