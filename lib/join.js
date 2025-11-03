const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        res.render('menu', context('join', {}), (e, content) => {
            res.end(content);
        });
    },
    game : (req, res) => {
        console.log(req.params.roomID);
        const prevUrl = req.get('Referer');
        console.log(prevUrl)
        if(req.session.me == undefined || req.session.me.id < 0 || prevUrl == undefined) {
            res.redirect('/user')
            return;
        }
        req.session.me.roomID = req.params.roomID;
        res.render('game', {background : 'background.ejs', isMaster : prevUrl == 'http://test.com/create'}, (e, content) => {
            res.end(content);
        });
    },
};