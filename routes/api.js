const express = require('express');
const router = express.Router();
var apiController = require('../controllers/scores')


router.get('/scores', apiController.getAllScores);
router.post('/scores', apiController.create);


module.exports = router;