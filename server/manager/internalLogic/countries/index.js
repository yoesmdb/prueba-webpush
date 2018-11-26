let countryFuntions = require('./functions.js');

exports.cFunctions = function(app) {
    /*app.post('/login', passport.authenticate('login', { failureRedirect: '/' }),
        (req, res) => {
            let usuario = req.user
            if (usuario.role == 'editor') {
                res.redirect('home');
            } else {
                res.redirect('about');
            }


        });*/
    app.get('/getCountries', countryFuntions.getCountries);

    app.post('/getCountryByID', countryFuntions.getCountryByID);

    app.get('/getAllCountries', countryFuntions.getAllCountries);

    app.post('/updaCountry', countryFuntions.updCountry);

    app.post('/deleCountry', countryFuntions.deleCountry);

    app.post('/newCountry', countryFuntions.newCountry);
};