const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        res.render('menu', context('create', {}), (e, content) => {
            res.end(content);
        });
    },
};