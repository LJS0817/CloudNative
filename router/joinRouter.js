const express = require('express');
const router = express.Router();
const content = require('../lib/join')

router.get('/', (req, res) => {
    content.home(req, res);
});

router.get('/:roomID', (req, res) => {
    content.game(req, res);
})

module.exports = router;

