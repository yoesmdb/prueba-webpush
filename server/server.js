////////////////////////
// Internal dependencies
////////////////////////
'use strict';
require('./config/config');
const globalLogin = require('./manager/login/index.js');
const globalNotifications = require('./manager/notifications/index.js');
const globalCountries = require('./manager/internalLogic/countries/index.js');
const globalStates = require('./manager/internalLogic/states/index.js');
const globalTiers = require('./manager/internalLogic/tiers/index.js');
const globalTopics = require('./manager/internalLogic/topics/index.js');
const globalSuscriptors = require('./manager/internalLogic/suscriptors/index.js');
const globalEdiData = require('./manager/internalLogic/editordata/index.js');
const globalEditorsTopics = require('./manager/internalLogic/editortopics/index.js');
const globalCampaign = require('./manager/internalLogic/campaign/index.js');
const AuthMiddleware = require('./manager/middleware/authUser.js');
const globalMasters = require('./manager/internalLogic/masters/index.js');
const globalSmartLink = require('./manager/internalLogic/smartlink/index.js');
//const globalEditor = require('./manager/editor/index.js');

////////////////////////
// Packages installed
////////////////////////
const express = require('express');
const fileUpload = require('express-fileUpload');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('./manager/login/passport.js')(passport);
const CookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const flash = require('connect-flash');
var path = require('path');


/////////////////////////////////////////////////////////////////////////////////////
////////// CONFIGURACION PARA EJS || CONFIGURATION FOR EJS ////////
/////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(__dirname + './../public'));

//Para que express renderice las vistas EJS cuando res.render sea llamado || For express to render the EJS views when res.render is called 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));



/////////////////////////////////////////////////////////////////////////////////////////////
////////// FIN CONFIGURACION PARA EJS || END CONFIGURATION FOR EJS ////////
/////////////////////////////////////////////////////////////////////////////////////////////


app.use(CookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'push123',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// default options
app.use(fileUpload());

var serviceAccount = require('./../path/to/prueba-e78cc-firebase-adminsdk-6aqgy-33f486b51b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://prueba-e78cc.firebaseio.com'
});

////////////////////////////////////////////////////////////////////////////////////// 
///////// DESPLIEGUE DE VISTAS EJS || DISPLAY OF VIEWS EJS /////////
////////////////////////////////////////////////////////////////////////////////////// 
app.get('/', (req, res) => {
    /* res.render('home', {});
     req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
     console.log(`numero de visitas ${req.session.cuenta}`);

    if (req.isAuthenticated()) {
        res.render('home', {});
    } else {
        res.render('login', {
            title: '--WHATPUSH LOGIN PAGE--',
            message: req.flash('success')
        });
        }
    }*/

    res.render('login', {
        title: '--WHATPUSH LOGIN PAGE--',
        message: req.flash('success')
    });
});



app.get('/register', (req, res) => {
    res.render('register', {});
});

app.get('/newPassword', (req, res) => {
    res.render('register', {});
});


app.get('/recoverpassword', (req, res) => {
    res.render('forgotPassword', {});
});

app.get('/updateCountry', (req, res) => {
    res.render('updCountry', {});
});

// views Advertiser || vistas Advertiser

app.get('/AdvertiserStatistics', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Advertiser/AdvertiserStatistics', {
        active: 'AdvertiserStatistics',
        userName: req.user.username
    });
});

app.get('/AdvertiserFinance', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Advertiser/AdvertiserFinance', {
        active: 'AdvertiserFinance',
        userName: req.user.username
    });
});

app.get('/AdvertiserCampaings', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Advertiser/AdvertiserCampaings', {
        active: 'AdvertiserCampaings',
        userName: req.user.username,
        message: ``,
    });
});

app.get('/AdvertiserSupport', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Advertiser/AdvertiserSupport', {
        active: 'AdvertiserSupport',
        userName: req.user.username
    });
});

app.get('/AdvertiserAcademy', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Advertiser/AdvertiserAcademy', {
        active: 'AdvertiserAcademy',
        userName: req.user.username
    });
});

// end views Advertiser || final vistas Advertiser


// views editor || vistas editor

app.get('/EditorStatistics', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Editor/EditorStatistics', {
        active: 'EditorStatistics',
        userName: req.user.username
    });
});

app.get('/EditorPayments', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Editor/EditorPayments', {
        active: 'EditorPayments',
        userName: req.user.username
    });
});

app.get('/EditorSites', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Editor/EditorSites', {
        active: 'EditorSites',
        userName: req.user.username
    });
});

app.get('/EditorSupport', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Editor/EditorSupport', {
        active: 'EditorSupport',
        userName: req.user.username
    });
});

app.get('/EditorAcademy', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Editor/EditorAcademy', {
        active: 'EditorAcademy',
        userName: req.user.username
    });
});

// end views editor || final vistas editor

// views admin || vistas admin
app.get('/AdminStatistics', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminStatistics', {
        active: 'AdminStatistics',
        userName: req.user.username
    });
});

app.get('/AdminCampaign', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminCampaign', {
        active: 'AdminCampaign',
        userName: req.user.username
    });
});

app.get('/AdminCampaignManagement', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminCampaignManagement', {
        active: 'AdminCampaignManagement',
        userName: req.user.username
    });
});

app.get('/AdminSmartLink', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminSmartLink', {
        active: 'AdminSmartLink',
        userName: req.user.username
    });
});

app.get('/AdminAppSetting', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminAppSetting', {
        active: 'AdminAppSetting',
        userName: req.user.username
    });
});

app.get('/AdminUserManagement', AuthMiddleware.isLogged, (req, res, next) => {
    res.render('./Admin/AdminUserManagement', {
        active: 'AdminUserManagement',
        userName: req.user.username
    });
});

// end views admin || final vistas admin


////////////////////////////////////////////////////////////////////////////////////// 
///// FIN DESPLIEGUE DE VISTAS EJS || END DISPLAY OF VIEWS EJS /////
////////////////////////////////////////////////////////////////////////////////////// 

globalLogin.lFunctions(app);
globalNotifications.notificationsFunctions(app);
globalCountries.cFunctions(app);
globalStates.stFunctions(app);
globalTiers.trFunctions(app);
globalTopics.topFunctions(app);
globalSuscriptors.suscFunctions(app);
globalEdiData.EditorFunctions(app);
globalEditorsTopics.Functions(app);
globalCampaign.CampFunctions(app);
globalMasters.mFuntions(app);
globalSmartLink.slFunctions(app);


app.listen(process.env.PORT, () => {
    console.log(`escuchando en el puesto ${process.env.PORT}`);
});