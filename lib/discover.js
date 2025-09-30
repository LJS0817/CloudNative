const { context } = require('./include');

const islock = (b) => {
    return b ? 'locked' : '';
}

module.exports = {
    home : (req, res) => {
        const rooms = [
            { id: 1, title: 'Test Room 1', cnt: 1, isLocked: islock(false) },
            { id: 2, title: 'Test Room 2', cnt: 1, isLocked: islock(false) },
            { id: 3, title: 'Test Room 3', cnt: 2, isLocked: islock(false) },
            { id: 4, title: 'Test Room 4', cnt: 1, isLocked: islock(true) },
            { id: 5, title: 'Test Room 5', cnt: 2, isLocked: islock(true) }
        ];
        res.render('menu', context('discover', rooms), (e, content) => {
            res.end(content);
        });
    },
};