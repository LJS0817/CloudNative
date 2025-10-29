const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        const cards = [
            { url: '/discover', title: 'Join Game', desc: 'Multiplayer' },
            { url: '/join', title: 'Search Room', desc: 'Search room use room id' },
            { url: '/create', title: 'Create Room', desc: 'Create Custom room' },
            { url: '#', title: 'Mug', desc: 'Start your day right.' },
            { url: '#', title: 'Hat', desc: 'Protect yourself from the sun.' }
        ];
        res.render('menu', context('mainmenu', cards), (e, content) => {
            res.end(content);
        });
    },
    test : (req, res) => {
        res.render('menu', context('mainmenu', []), (e, content) => {
            res.end(content);
        });
    }
};