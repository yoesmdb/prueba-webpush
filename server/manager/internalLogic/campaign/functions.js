const dbconnection = require('./conexion.js');



exports.saveCampaign = (req, res) => {

    let roleActualy = req.user.role;

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "fileImage") is used to retrieve the uploaded file
    let fileImage = req.files.fileImage;
    let respMessage = '';

    if (roleActualy == 'ADVERTISER') {

        let container = req.body;

        let observations = '';
        userActualy = req.user.id;

        let campaign = {
            NAMECAMPAIGN: container.txtCampaignName,
            IMAGE: '',
            TITLE: container.txtPushtitle,
            CONTENT: container.txtPushdescrip,
            URL: container.txtUrlPromo,
            IDCOUNTRY: container.selCountry,
            CLICKPAY: container.valCPC,
            NUMBERCLICKS: 0,
            TOTALBALANCE: container.txtTotalBudget,
            DAILYBALANCE: container.txtDailyBudget,
            NUMBERDAILYCLICKS: container.txtDailyClicks,
            NUMBERTOTALCLICKS: container.txtTotalClicks,
            CAMPAIGNAPROVED: '0',
            IDTOPIC: container.selTopic,
            IDSTATE: 1,
            IDUSER: userActualy,
            OBSERVATIONS: observations,
        };

        dbconnection.saveCampaign(campaign, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {

                let insertId = data.insertId;
                var fiName = fileImage.name;
                var arrFiName = fiName.split("."); // Posición 0 = nombre, posición 1 = formato imagen   
                var camName = container.txtCampaignName;

                camName = camName.replace(/ /g, "");
                var newFiName = `${insertId}${camName}.${arrFiName[1]}`;
                fileImage.name = newFiName;

                var uploadPath = __dirname + './../../../../public/utilities/campaignFiles/' + fileImage.name;

                fileImage.mv(uploadPath, function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        dbconnection.updateCampaignImgPathById({ IDCAMPAIGN: insertId, FILENAME: fileImage.name }, (err, data) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                res.render('./Advertiser/AdvertiserCampaings', {
                                    active: 'AdvertiserCampaings',
                                    userName: req.user.username,
                                    message: `campaign ${container.txtCampaignName} saved with successes`,
                                });
                            }
                        });
                    }
                    //res.send('File uploaded to ' + uploadPath);
                });
            }
        });
    }
};



exports.getCampaignByAprobed = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {
        let container = req.body;

        let campaign = {
            APROVED: container.DATA1,
        }

        dbconnection.getCampaignByAprobed(campaign, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("selected");
                console.log(data);
                var respons = [];
                data.forEach(campaign => {
                    respons.push({
                        DATA1: campaign.IDCAMPAIGN,
                        DATA2: campaign.NAMECAMPAIGN, //
                        DATA3: campaign.IMAGE, //
                        DATA4: campaign.TITLE, //
                        DATA5: campaign.CONTENT, //
                        DATA6: campaign.URL, //
                        DATA7: campaign.IDCOUNTRY,
                        DATA8: campaign.NAMECOUNTRY, //
                        DATA9: campaign.CLICKPAY,
                        DATA10: campaign.NUMBERCLICKS,
                        DATA11: campaign.TOTALBALANCE,
                        DATA12: campaign.DAILYBALANCE,
                        DATA13: campaign.NUMBERDAILYCLICKS,
                        DATA14: campaign.NUMBERTOTALCLICKS,
                        DATA15: campaign.CAMPAIGNAPROVED,
                        DATA16: campaign.IDTOPIC,
                        DATA17: campaign.NAMETOPIC, //
                        DATA18: campaign.IDSTATE,
                        DATA19: campaign.TYPESTATE,
                        DATA20: campaign.IDUSER,
                        DATA21: campaign.NAME, //
                        DATA22: campaign.LASTNAME, //
                        DATA23: campaign.NAMECOMPANY, //
                        DATA24: campaign.OBSERVATIONS, //
                        DATA25: campaign.DATEUPDATE,
                        DATA26: campaign.DATEADMISSIOIN
                    });
                });
                res.json(respons);
            }
        });
    }
};


exports.getCampaignByID = (req, res) => {
    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let campaign = {
            IDCAMPAIGN: container.DATA1,
        }

        dbconnection.getCampaignByID(campaign, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("selected");
                console.log(data);
                var respons = [];
                data.forEach(campaign => {
                    respons.push({
                        DATA1: campaign.IDCAMPAIGN,
                        DATA2: campaign.NAMECAMPAIGN, //
                        DATA3: campaign.IMAGE, //
                        DATA4: campaign.TITLE, //
                        DATA5: campaign.CONTENT, //
                        DATA6: campaign.URL, //
                        DATA7: campaign.IDCOUNTRY,
                        DATA8: campaign.NAMECOUNTRY, //
                        DATA9: campaign.CLICKPAY,
                        DATA10: campaign.NUMBERCLICKS,
                        DATA11: campaign.TOTALBALANCE,
                        DATA12: campaign.DAILYBALANCE,
                        DATA13: campaign.NUMBERDAILYCLICKS,
                        DATA14: campaign.NUMBERTOTALCLICKS,
                        DATA15: campaign.CAMPAIGNAPROVED,
                        DATA16: campaign.IDTOPIC,
                        DATA17: campaign.NAMETOPIC, //
                        DATA18: campaign.IDSTATE,
                        DATA19: campaign.TYPESTATE,
                        DATA20: campaign.IDUSER,
                        DATA21: campaign.NAME, //
                        DATA22: campaign.LASTNAME, //
                        DATA23: campaign.NAMECOMPANY, //
                        DATA24: campaign.OBSERVATIONS, //
                        DATA25: campaign.DATEUPDATE,
                        DATA26: campaign.DATEADMISSIOIN
                    });
                });
                res.json(respons);
            }
        });
    }
};


exports.updaAproReject = (req, res) => {

    let roleActualy = req.user.role;

    if (roleActualy == 'ADMINISTRADOR') {

        let container = req.body;

        let campaign = {
            IDCAMPAIGN: container.DATA1,
            CAMPAIGNAPROVED: container.DATA2,
            OBSERVATIONS: container.DATA3,
        }

        dbconnection.updaAproReject(campaign, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("update granted");
                console.log(data);
                res.send({ status: 202, result: 'OK' });
            }
        });
    }
}