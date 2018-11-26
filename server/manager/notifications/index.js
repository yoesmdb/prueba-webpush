let notifFuntions = require('./functions.js');

exports.notificationsFunctions = function(app) {
    app.post('/respNotification', notifFuntions.respNotification);
    app.post('/solveClick', notifFuntions.solveClick);
};