const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        res.render('menu', context('join', {}), (e, content) => {
            res.end(content);
        });
    },
    game : (req, res) => {
        console.log(req.params.roomID);
        res.render('game', context('', {}), (e, content) => {
            res.end(content);
        });
    },
};