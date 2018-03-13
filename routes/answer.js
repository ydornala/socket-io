const express = require('express');
const router = express.Router();

const answers = require('../models/answer');

/* GET questions listing. */
router.get('/', (req, res) => {
    answers.find({})
        .then(docs => {
            res.send(docs);
    });
});

router.post('/', (req, res) => {
    answers.create(req.body, (err, doc) => {
        res.send(doc);
    });
});

router.get('/:questionId', (req, res) => {
    answers.find({question: req.params.questionId}, (err, doc) => {
        res.send(doc);
    });
});


module.exports = router;
