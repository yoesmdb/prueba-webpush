let stateFuntions = require('./functions.js');

exports.stFunctions = function(app) {

    app.get('/getStates', stateFuntions.getStates);

    app.post('/updaState', stateFuntions.updState);

    app.post('/newState', stateFuntions.newState);
};