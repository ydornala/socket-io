const express = require('express');
const router = express.Router();

const questions = require('../models/question');

/* GET questions listing. */
router.get('/', (req, res) => {
    questions.find({})
        .then(docs => {
            res.send(docs);
    });
});

router.post('/', (req, res) => {
    questions.create(req.body, (err, doc) => {
        res.send(doc);
    });
});

router.get('/:sectionId', (req, res) => {
    console.log('params', req.params)
    questions.find({section: req.params.sectionId}, (err, doc) => {
        res.send(doc);
    });
});


module.exports = router;
