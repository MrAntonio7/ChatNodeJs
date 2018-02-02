var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).send('hola mundo desde una ruta')
})

var messages = [{
    id: 1,
    text: 'Bienvenido al chat',
    nickname: 'Bot'
}];

io.on('connection', function(socket) {
    console.log('alguien se ha conectado al socket desde la IP:' + socket.handshake.address);
    socket.on('nick', function(data) {
        console.log(data);
        io.sockets.emit('nick', data);

        socket.on('add-message', function(data) {
            messages.push(data);
            io.sockets.emit('messages', data);
        });

        socket.on('tecleando', function(data) {
            io.sockets.emit('escribiendo', data + ' esta escriniendo...');

            setTimeout(function() {
                io.sockets.emit('escribiendo', '');
            }, 3000);
        });

    });

});

server.listen(3000, function() {
    console.log('Servidor funcionando en http://localhost:3000');
});