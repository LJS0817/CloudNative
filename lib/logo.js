const sanitize = require('sanitize-html');
const path = require('path');
const db = require(path.resolve(__dirname, '../../common-assets/db.js'))

/*
check flag

n : none
f : failed
i : sign in
p : sign up
a : already has
d : id
u : username
e : does not exist (보류)
*/

module.exports = {
    home : (req, res) => {
        if(req.session.me != undefined) res.redirect('/');
        else {
            res.render('logo', {background:"background.ejs", check:"n"}, (e, content) => {
                res.end(content);
            });
        }
    },
    sign : async (req, res) => {
        let post = req.body;
        let id = sanitize(post.id);
        let pwd = sanitize(post.pwd);
        const flag = post.flag;
        const username = sanitize(post.username);
        
        console.log(post);

        if ((id.length < 5 || id.indexOf(' ') > -1) || (pwd.length < 8) || (flag == 'p' && username.replaceAll(' ', '').length < 2)) {
            res.render('logo', { background: "background.ejs", check: "f" }, (e, content) => {
                res.end(content);
            });
            return;
        }

        console.log(post);
        if (flag == 'i' || flag == '') {
            const user = await db.select('user', 'id, name, ranking', 'userid = ? AND password = ?', [id, pwd])
            if (user.length == 0) {
                console.log('test');
                res.render('logo', { background: "background.ejs", check: "fi" }, (e, content) => {
                    res.end(content);
                });
            } else {
                req.session.me = user[0];
                res.redirect('/');
            }
            //return;
        } else {
            const user = await db.select('user', 'COUNT(CASE WHEN userid = ? THEN 1 END) as idCnt, COUNT(CASE WHEN name = ? THEN 1 END) as nCnt', '', [id, username])
            if (user[0].idCnt < 1 && user[0].nCnt < 1) {
                console.log('1234');
                const rst = await db.insert('user', ['id', 'userid', 'password', 'name', 'ranking'], [0, id, pwd, username, 0])
                res.redirect('/');
            } else {
                console.log(user);
                let flags = 'fpa'
                if(user[0].idCnt > 0) flags += 'd';
                if(user[0].nCnt > 0) flags += 'u';
                res.render('logo', { background: "background.ejs", check: flags }, (e, content) => {
                    res.end(content);
                });
            }
        }

        // console.log(post);
        // res.redirect('/');
    },
};