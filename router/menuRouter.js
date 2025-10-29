const express = require('express');
const router = express.Router();
const content = require('../lib/menu')

router.get('/', (req, res) => {
    content.home(req, res);
});

router.post('/sign', (req, res) => {
    content.sign(req, res);
});

router.get('/test', (req, res) => {
    content.test(req, res);
});

module.exports = router;

