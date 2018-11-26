let tiersFuntions = require('./functions.js');

exports.trFunctions = function(app) {

    app.get('/getTiers', tiersFuntions.getTiers);

    app.post('/getTiersByID', tiersFuntions.getTiersByID);

    app.post('/newTier', tiersFuntions.newTier);

    app.post('/updatier', tiersFuntions.updTier);

    app.post('/deletier', tiersFuntions.deleTier);

    app.post('/tierByCountry', tiersFuntions.tierByCountry);

};