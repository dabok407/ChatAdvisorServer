var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
/*var server = app.listen(3000);
var io = require('socket.io').listen(server);*/
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(require('connect-history-api-fallback')());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); next();
});
app.get('/', function(req, res) {
    res.sendFile('Hi Chating App Server');
});
io.on('connection', function (socket) {

    console.log('Connect from Client: ' + socket)

    socket.on('chat', function (data) {
        console.log('message from Client: ' + data.message)
        var rtnMessage = {
            message : data.message
            ,socketId : data.socketId
        }; // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage);
    });
})

server.listen(3001, function() {
    console.log('socket io server listening on port 3001')
})




module.exports = app;
