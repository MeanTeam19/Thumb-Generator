(function () {
    'use strict';

    let app = require('express')(),
        server = require('http').createServer(app),
        io = require('socket.io')(server),
        env = process.env.NODE_ENV || 'development',
        config = require('./server/config/config')[env];

    require('./server/config/mongoose')(config);
    require('./server/config/passport')();
    require('./server/config/express')(app, io, config);
    require('./server/routes/index')(app);

    server.listen(config.port, () =>
        console.log(`Server is running on port ${config.port}...`));
} ());