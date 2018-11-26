let CampaignFuntions = require('./functions.js');

exports.CampFunctions = function(app) {
    app.post('/saveCampaign', CampaignFuntions.saveCampaign);

    app.post('/getCampaignByID', CampaignFuntions.getCampaignByID);

    app.post('/getCampaignByAprobed', CampaignFuntions.getCampaignByAprobed);

    app.post('/updaAproReject', CampaignFuntions.updaAproReject);
};