const express = require('express');
const router = express.Router();
const content = require('../lib/menu')

router.get('/', (req, res) => {
    content.home(req, res);
});

router.post('/sign', (req, res) => {
    content.sign(req, res);
});

module.exports = router;

