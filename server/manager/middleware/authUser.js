module.exports = {

    isLogged: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    },

    isLoggedLogin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        }
    }
}