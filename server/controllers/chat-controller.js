'use strict';
let users = require('../data/users');

module.exports = function(io, socket) {
    socket.emit('username', socket.request.user.username);

    users.getAllPublicMessages(function (err, oldMessages) {
        socket.emit('oldMessages', oldMessages)
    });

    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });

    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;
        socket.request.user.messages.push(message);
        socket.request.user.save();

        io.emit('chatMessage', message);
    });

    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};
