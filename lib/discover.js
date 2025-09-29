const { context } = require('./include');

module.exports = {
    home : (req, res) => {
        const rooms = [
            { title: 'Test Room 1', owner: 'USERNAME', player: '' },
            { title: 'Test Room 2', owner: 'USERNAME', player: 'TEST' },
            { title: 'Test Room 3', owner: 'USERNAME', player: '' },
            { title: 'Test Room 4', owner: 'USERNAME', player: '' },
            { title: 'Test Room 5', owner: 'USERNAME', player: '' }
        ];
        res.render('menu', context('discover', rooms), (e, content) => {
            res.end(content);
        });
    },
};