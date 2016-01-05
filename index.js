var express = require('express'),
env = process.env.NODE_ENV || 'development',
app = express(),
port = 1337;

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');   

app.get('/', function(request, result) {
    result.render('index');
});

app.listen(port);