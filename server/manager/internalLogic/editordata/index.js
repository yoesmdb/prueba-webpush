let EditorFuntions = require('./functions.js');


exports.EditorFunctions = function(app) {

    app.post('/addUrlEditor', EditorFuntions.addUrl);

    app.get('/getDataEditors', EditorFuntions.getDataEditors);

    app.post('/updaDataEditor', EditorFuntions.updDataEditor);

    app.post('/getDataEditorsId', EditorFuntions.getDataEditorsId);
};