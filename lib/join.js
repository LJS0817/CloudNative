const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        res.render('menu', context('join', {}), (e, content) => {
            res.end(content);
        });
    },
};