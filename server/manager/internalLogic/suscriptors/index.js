let suscriptorsFuntions = require('./functions.js');

exports.suscFunctions = function(app) {

    app.get('/getSuscriptors', suscriptorsFuntions.getSuscriptors);

    app.post('/newSuscriptor', suscriptorsFuntions.newSuscriptor);

    app.post('/updaSuscriptor', suscriptorsFuntions.updSuscriptor);

};