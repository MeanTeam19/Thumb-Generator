module.exports = {
    getUnauthorized: function (req, res, next) {
        res.render('unauthorized/unauthorized');
    }
}