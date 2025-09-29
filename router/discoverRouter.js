const express = require('express');
const router = express.Router();
const content = require('../lib/discover')

router.get('/', (req, res) => {
    content.home(req, res);
});

module.exports = router;

