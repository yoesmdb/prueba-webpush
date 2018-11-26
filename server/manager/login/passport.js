const LocalStrategy = require('passport-local').Strategy;
const dbconnection = require('./conexion.js');
const bcrypt = require('bcryptjs');


module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        (req, user, password, done) => {

            let passInput = password;
            let userlogin = {
                username: user,
            }

            dbconnection.getUser(userlogin, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data.length > 0) {
                        let userdb = data[0];
                        let sonIguales = bcrypt.compareSync(passInput, userdb.PASSWORD);
                        if (sonIguales) {
                            return done(null, {
                                id: userdb.ID,
                                username: userdb.EMAIL,
                                role: userdb.TYPE
                            });

                        } else {
                            return done(null, false, req.flash('success', 'Contraseña incorrecta'));
                        }
                    } else {
                        return done(null, false, req.flash('success', 'Usuario no existe'));
                    }
                }
            });
        }
    ));
}