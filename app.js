 var express = require('express');
 var socket = require('socket.io');

 var port = process.env.PORT || 4000;

 //App setup
 var app = express();

 //server
 var server= app.listen(port,function () {
 	console.log('listenig to requests on port 4000');
 });

 // static files 
 app.use(express.static(__dirname + '/public'));

 //socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('made socket connection', socket.id);

	socket.on('chat', function(data){
      io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data)
	});
});