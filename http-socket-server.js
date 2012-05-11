var static = require('node-static'),
    io = require('socket.io').listen(3000),
    fileServer = new static.Server(),
    slideNo = 0;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}).listen(8080);

//io.set('log level', 1);
io.sockets.on('connection', function (client) {
    client.emit("handshake", {});
    client.on("register", function(data) {
        console.log(data);
        client.emit("registered");
    });
});