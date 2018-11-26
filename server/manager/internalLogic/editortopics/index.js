let editTopicsFuntions = require('./functions.js');

exports.Functions = function(app) {

    app.get('/getEditorsTopics', editTopicsFuntions.getEditorsTopics);

    app.post('/updaEditorsTopics', editTopicsFuntions.updEditorsTopics);

    app.post('/newEditorsTopics', editTopicsFuntions.newEditorsTopics);
};