var socket = io();

// setInterval(function() {
// //    socket.emit('question', {name: 'Yeshwanth', question: 'whats your name?'});
//     socket.emit('result', {
//         "name": "Yeshu",
//         "section": "5aa2363f4d5a0e628ac7edd1",
//         "answers": [{
//             "question": "5aa904d7ff68eb728b913283",
//             "answer": "class with no implementation"
//         }]
//     });
// }, 5000);

socket.on('question', function(d) {
    $('.pages').append('<li><strong>' + d.name + ':</strong> ' + d.question + '</li>')
    $('.pages').scrollTop($('.pages')[0].scrollHeight - $('.pages')[0].clientHeight);

});

socket.on('section', function(d) {
    console.log('section came', d);
});

socket.on('result', (results) => {
    console.log('results client', results);
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

        $scope.enable = function(id) {
            $http.get('/section/enable/' + id)
                .then(res => {
                    console.log('enable', res);
                    $scope.load();
                });
        }

        socket.on('section', () => {
            $scope.load();
        });
    });