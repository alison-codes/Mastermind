var Score = require('../models/Score');

module.exports = {
    getAllScores,
    create,
}

// function getAllScores(req, res) {
//     Score.find({}, function (err, foundS) {
//         if (err) console.log(err);
//         res.status(200).send(foundS);
//     });
// }

async function getAllScores(req, res) {
    const scores = await Score.find({})
        .sort({ numGuesses: 1, seconds: 1 })
    res.json(scores);
}


async function create(req, res) {
    try {
        await Score.create(req.body);
        highScores(req, res);
    } catch (err) {
        res.json({ err });
    }
}