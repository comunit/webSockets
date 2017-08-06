// make connection

var socket = io();

// query dom 
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


//emit events

btn.addEventListener('click', function () {
	socket.emit('chat', {
		message: message.value,
        handle: handle.value
	});
});

message.addEventListener('keypress', function(){
	socket.emit('typing', handle.value);
});

//listen for events
socket.on('chat', function(data){
	feedback.innerHTML = '';
    output.innerHTML += '<P><strong>'+ data.handle + ': </strong>' + data.message + '</p>';
    message.value = '';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message....</em></p>'
});