let maFuntions = require('./functions.js');

exports.mFuntions = function(app) {

    app.get('/getDataDownload', maFuntions.getDataDownload);

};