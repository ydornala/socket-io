var socket = io();

setInterval(function() {
   socket.emit('question', {name: 'Yeshwanth', question: 'whats your name?'});
}, 2000);

socket.on('question', function(d) {
    $('.pages').append('<li><strong>' + d.name + ':</strong> ' + d.question + '</li>')
    console.log('pages height', document.querySelector(".pages").scrollHeight);
    // window.scrollTo(0,document.querySelector(".pages").scrollHeight);

});

socket.on('section', function(d) {
    console.log('section came', d);
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