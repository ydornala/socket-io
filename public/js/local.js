var socket = io();

setInterval(function() {
//    socket.emit('question', {name: 'Yeshwanth', question: 'whats your name?'});
}, 2000);

socket.on('question', function(d) {
    $('.pages').append('<li><strong>' + d.name + ':</strong> ' + d.question + '</li>')
});


angular.module('deepak', [])
    .controller('section', ($http, $scope) => {
        $scope.sections = [];
        $http.get('/section')
            .then(res => {
                console.log('section docs', res);

                $scope.sections = res.data;
        });

        $scope.completed = function(id) {
            console.log('completed...', id)
            socket.emit('section', {id: id});
        }
    });