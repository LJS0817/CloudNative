const express = require('express');
const router = express.Router();
const content = require('../lib/create')

router.get('/', (req, res) => {
    content.home(req, res);
});

router.post('/room', (req, res) => {
    content.create(req, res);
});

module.exports = router;