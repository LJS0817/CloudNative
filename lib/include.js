module.exports = {
    context : (b, some) => {
        return {
            side : 'sidebar.ejs',
            body : b + '.ejs',
            background : 'background.ejs',
            some : some
        };
    },
}