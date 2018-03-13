var socket = io();

setInterval(function() {
   socket.emit('question', {name: 'Yeshwanth', question: 'whats your name?'});
}, 2000);

socket.on('question', function(d) {
    console.log('question came', d);
    $('.pages').append('<li><strong>' + d.name + ':</strong> ' + d.question + '</li>')
});

angular.module('deepak', [])
    .controller('section', ($http, $scope) => {
        $scope.sections = [];

        $scope.load = function() {
            $http.get('/section')
                .then(res => {
                    $scope.sections = res.data;
            });
        }

        $scope.load();

        $scope.completed = function(id) {
            console.log('completed...', id)
            socket.emit('section', {id: id});
        }

        socket.on('section', () => {
            $scope.load();
        });
    });