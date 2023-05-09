let express = require('express');
let http = require('http');
let path = require('path');
let io = require('socket.io');

let app = express();

app.set('port',process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));


let server = http.createServer(app).listen(app.get('port'),function(){
    console.log(`Server running on port 3000`)
})

io = require('socket.io').listen(server);

// handle socket traffic
io.sockets.on('connection',function(socket){
    socket.on('nick',function(nick){
        socket.nickname = nick
    })

    // reply chat data to client
    socket.on('chat',function(data){
        let nickname = socket.nickname
        let payload = {
            message: data.message,
            nick: nickname
        };

        socket.emit('chat',payload);
        socket.broadcast.emit('chat',payload);
    })
})