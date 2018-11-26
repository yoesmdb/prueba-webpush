let loginFuntions = require('./functions.js');
let passport = require('passport');

exports.lFunctions = function(app) {
    app.post('/login', passport.authenticate('login', { failureRedirect: '/' }),
        (req, res) => {
            let usuario = req.user
            if (usuario.role == 'EDITOR') {
                res.redirect('EditorStatistics');
            } else if (usuario.role == 'ADVERTISER') {
                res.redirect('AdvertiserStatistics');
            } else if (usuario.role == 'ADMINISTRADOR') {
                res.redirect('AdminStatistics');
            }


        });
    app.get('/Connt', loginFuntions.Connt);

    app.get('/logout', loginFuntions.Logout);

    app.post('/newRegister', loginFuntions.newRegister);

    app.post('/newPass', loginFuntions.newPass);


};