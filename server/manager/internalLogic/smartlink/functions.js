const dbconnection = require('./conexion.js');
const dbconnectionMaster = require('../masters/conexion.js');
const fs = require('fs');


exports.newSmartLink = (req, res) => {

        let roleActualy = req.user.role;


        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "fileImage") is used to retrieve the uploaded file
        let fileImage = req.files.fileImage;
        let respMessage = '';

        if (roleActualy == 'ADMINISTRADOR' || roleActualy == 'EDITOR') {

            let container = req.body;

            userActualy = req.user.id;

            let smartLink = {
                TITLE: container.txt_titleSL,
                DESCRIPTION: container.txt_descriptionSL,
                URLTOPROMO: container.txt_urlPromoSL,
                SMARTLINKURL: ``,
                SMARTLINKURLIMG: ``,
                IDUSER: userActualy
            };

            dbconnection.newSmartLink(smartLink, (err, data) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            let pathSmartLink = __dirname + `./../../../../public/utilities/smartLink/` + data.insertId;

                            if (fs.existsSync(pathSmartLink)) {
                                console.log("existe");
                            } else {
                                // Se crea el folder para el smartLink
                                fs.mkdir(pathSmartLink, { recursive: true }, (err) => {
                                    if (err) throw err;
                                });
                            }

                            let insertId = data.insertId;
                            var fiName = fileImage.name;
                            var arrFiName = fiName.split("."); // Posición 0 = nombre, posición 1 = formato imagen   
                            var slName = container.txt_titleSL;

                            slName = slName.replace(/ /g, "");
                            var newFiName = `${insertId}${slName}.${arrFiName[1]}`;
                            fileImage.name = newFiName;

                            var uploadPath = pathSmartLink + `/` + fileImage.name;

                            fileImage.mv(uploadPath, function(err) {
                                        if (err) {
                                            return res.status(500).send(err);
                                        } else {
                                            dbconnectionMaster.getdataMaster((err, data) => {
                                                        if (err) {
                                                            console.log(err);
                                                            reject(err);
                                                        } else {
                                                            fs.writeFile(pathSmartLink + `/` + insertId + slName + '.html',
                                                                    `<!DOCTYPE html>\n` +
                                                                    `<html>\n` +
                                                                    `<head>\n` +
                                                                    `<meta charset="utf-8">\n` +
                                                                    `<meta name="viewport" content="width=device-width, initial-scale=1">\n` +
                                                                    `<title>${smartLink.TITLE}</title>\n` +
                                                                    `<style  type="text/css">\n` +
                                                                    `body {  color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }\n` +
                                                                    `#message {background: white; max-width: 500px; margin: 100px auto 16px; padding: 32px 24px; border-radius: 3px; word-wrap: break-word;text-align: center}\n` +
                                                                    `#message p {line-height: 140%; margin: 16px 0 24px; font-size: 18px; }\n` +
                                                                    `#message a {display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }\n` +
                                                                    `@media (max-width: 600px) {body, #message { margin-top: 0; background: white; box-shadow: none; margin: 20% auto 16px;}}\n` +
                                                                    `#message img{ max-width: 100%;height: auto;}\n` +
                                                                    `</style>\n` +
                                                                    `<link rel="manifest" href="${data[0].linkmanifest}">\n` +
                                                                    `<script type="text/javascript" data-cfasync="false">\n` +
                                                                    `var dataPush = {dataDomain: '${data[0].primarydomain}/utilities/smartLink/${insertId +`/`+ insertId + slName}.html'};\n` +
                                                                    `var dataUrlPromo = {url:'${smartLink.URLTOPROMO}'};\n` +
                                                                    `</script>\n` +
                                                                    `<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js"></script>\n` +
                                                                    `<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js"></script>\n` +
                                                                    `<script src="${data[0].linkwhatpushslapp}"></script>\n` +
                                                                    `</head>\n` +
                                                                    `<body>\n` +
                                                                    `<div id="message">\n` +
                                                                    `<div > <img src="${data[0].primarydomain}/utilities/smartLink/${insertId +`/`+ fileImage.name}" alt="imgSL"> <p>${smartLink.DESCRIPTION}</p>\n` +
                                                                    `</div>\n` +
                                                                    `</div>\n` +
                                                                    `</body>\n` +
                                                                    `</html>\n`,
                                                                    function(err) {
                                                                        if (err) throw err;
                                                                        console.log('html creado!');
                                                                    });                                                                   
                                          let objSmartLink = {
                                                 SMARTLINKURL: `${data[0].primarydomain}/utilities/smartLink/${insertId +`/`+ insertId + slName}.html`,
                                                 SMARTLINKURLIMG:`${data[0].primarydomain}/utilities/smartLink/${insertId +`/`+ fileImage.name}`,
                                                 IDSMARTLINK: insertId
                                         };
                                         dbconnection.updStateSmartLink(objSmartLink, (err, data) => {
                                             if (err) {
                                              console.log(err);
                                              reject(err);
                                             } else{
                                                console.log(objSmartLink);
                                                res.render('./Admin/AdminSmartLink', {
                                                     active: 'AdminSmartLink',
                                                     userName: req.user.username,
                                                 });
                                             }
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