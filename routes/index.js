const express = require('express');
const router = express.Router();
let socket;

function init(io) {
  io.on('connection', (socket) => {
    socket.on('info', function(d) {
      console.log('info event', d);
    });
  });
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Deepak PPT' });
});

module.exports = router;
module.exports.init = init