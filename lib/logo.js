const sanitize = require('sanitize-html');

module.exports = {
    home : (req, res) => {
        res.render('logo', {background:"background.ejs"}, (e, content) => {
                res.end(content);
        });
    },
    sign : (req, res) => {
        let post = req.body;
        let id = sanitize(post.id);
        let pwd = sanitize(post.pwd);
        const flag = post.flag;
        const user = sanitize(post.username);

        console.log(post);
        res.redirect('/menu');
    },
};