const express = require('express');
const router = express.Router();

const answers = require('../models/answer');
const users = require('../models/user');
const results = require('../models/result');

/* GET questions listing. */
router.get('/', (req, res) => {
    answers.find({})
        .then(docs => {
            res.send(docs);
    });
});

async function calculateResult(ans, cb) {
    let count = 0;
    let total = 0;
    await ans.forEach((a, index) => {
        console.log('index', index);
        total++;
        if(a !== {} || a !== null) {
            answers.findOne({question: a.question}, (err, correct) => {
                console.log('correct ==> ', correct, a);
                if(a.answer === correct.answer) {
                    count++;
                } 

                if(ans.length - 1 === index) {
                    cb({total: total, count: count});
                }
            });
        }
    });
}

function saveResults(counts, body, cb) {
    const rBody = {
        user: body.userId,
        section: body.section,
        total: counts.total,
        correctCount: counts.count
    }
    results.create(rBody, (err, calcResult) => {
        if(err) {
            return err;

            cb(err, null)
        }

        cb(null, calcResult)
    });
}

router.post('/', (req, res) => {
    const body = req.body;

    const ans = body.answers;
    const _user = {
        name: body.name.toLowerCase()
    }

    users.findOne(_user, (err, user) => {
        console.log('user update', user);
        if(!user) {
            console.log('null user');
            users.create(_user, (err, cUser) => {
                user = cUser;
                body.userId = user._id;

                console.log('create user >>', user);
                calculateResult(ans, resCounts => {
                    saveResults(resCounts, body, (err, _r) => {
                        res.send(_r);
                    });
                });
            });
        } else {
            body.userId = user._id;
            calculateResult(ans, (resCounts) => {
                console.log('calc res', resCounts);
                saveResults(resCounts, body, (err, _r) => {
                    res.send(_r);
                });
            });
        }
    });
});

router.get('/next', (req, res) => {
    res.send('done...');
});

module.exports = router;
