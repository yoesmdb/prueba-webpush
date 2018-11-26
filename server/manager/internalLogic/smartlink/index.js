let sLinkFuntions = require('./functions.js');

exports.slFunctions = function(app) {

    //app.get('/getTiers', sLinkFuntions.getTiers);

    app.post('/newSmartLink', sLinkFuntions.newSmartLink);

};