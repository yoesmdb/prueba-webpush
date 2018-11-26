let topicsFuntions = require('./functions.js');

exports.topFunctions = function(app) {

    app.get('/getTopics', topicsFuntions.getTopics);

    app.post('/getTopicByID', topicsFuntions.getTopicByID);

    app.post('/newTopic', topicsFuntions.newTopic);

    app.post('/updaTopic', topicsFuntions.updTopic);

    app.post('/deleTopic', topicsFuntions.deleTopic);

};