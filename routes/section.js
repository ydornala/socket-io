const express = require('express');
const router = express.Router();

const sections = require('../models/section');

/* GET users listing. */
router.get('/', (req, res) => {
    sections.find({})
        .then(docs => {
            res.send(docs);
    });
});

router.post('/', (req, res) => {
    sections.create(req.body, (err, doc) => {
        res.send(doc);
    });
});

router.get('/next/:id', (req, res) => {
    const id = req.params.id;

    sections.findByIdAndUpdate(id, { status: 'c' })
        .then(doc => {
            res.send(doc);
        });
});

module.exports = router;
