var express = require('express');
var router = express.Router();
var userCtrl =require('./userCtrl');

router.use(function timeLog(req, res, next) {
  //console.log('route -->Time: ', Date.now(),req.session,req.sessionID);
  //console.log("route-->session",req.session.name,req.sessionID,req.cookies);

  if (!req.session.name){
    req.session.name=req.url;
    //console.log("session set name");
  }

  next();
});
/* GET home page. */
router.all('/test', function(req, res, next) {

  //res.render('index', { title: 'Express' });

  res.send("test");
});

router.all('/login', function(req, res, next) {

  //res.render('index', { title: 'Express' });

  //console.log("{e:{code:0}}");
  res.send({e:{code:0}});
});

router.post('/useradd',userCtrl.useradd);



module.exports = router;
