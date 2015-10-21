var async = require('async');

var config = require('../config.js');

;


var useradd = function(req, res){


//console.log(req.headers);
    mongoose.model('tusers').findOne({ email:req.body.email }, function (err, data) {
        if (err) {
            res.send({e:{code:-1,desc:err}});
        }

        if (!data){
            //rst={e:{code:-1,desc:"user is not exist"}};
            ///res.send({e:{code:0,desc:"user is not exist"}});
            var _user = new (mongoose.model('tusers'))();
            _user.email=req.body.email;
            _user.passwd=crypto.createHash('md5').update(req.body.passwd+'cans').digest('hex');

            _user.save(function(){
                res.send({e:{code:0,desc:"User add ok"}});
            });

        }else{
            res.send({e:{code:0,desc:"User already exists"}});
        }
    })
};



exports.useradd=useradd;
