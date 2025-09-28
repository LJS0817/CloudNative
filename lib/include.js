module.exports = {
    context : (b, some) => {
        return {
            side : 'sidebar.ejs',
            body : b + '.ejs',
            some : some
        };
    },
}