var socket = io();

setInterval(function() {
//    socket.emit('question', {name: 'Yeshwanth', question: 'whats your name?'});
}, 2000);

socket.on('question', function(d) {
    $('.pages').append('<li><strong>' + d.name + ':</strong> ' + d.question + '</li>')
});
