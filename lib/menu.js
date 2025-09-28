const sanitize = require('sanitize-html');
const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        const cards = [
            { title: 'Join Game', desc: 'Multiplayer' },
            { title: 'Search Room', desc: 'Search room use room id' },
            { title: 'Create Room', desc: 'Create Custom room' },
            { title: 'Mug', desc: 'Start your day right.' },
            { title: 'Hat', desc: 'Protect yourself from the sun.' }
        ];
        res.render('menu', context('mainmenu', cards), (e, content) => {
            res.end(content);
        });
    },
};