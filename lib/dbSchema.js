var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId
    ;

var mongodb_host="127.0.0.1";
var mongodb_port=27017;
var mongodb_dbname="amsappdb"
var mongodb_poolsize=12;



var gMongoInstance = 0;

//var isconnected=false;

var tusers=new Schema({
     username	:String
    ,nickname   :String
    ,email      :String
    ,sex        :{type: Number, default: 0}
    ,create_at  :{type: Number, default: new Date().getTime()}
    ,last_at	:{type: Number, default: new Date().getTime()}
    ,passwd	    :String //md5
    ,passwdmd5:String
    ,uuid       :String
    ,token      :String
    ,actived    :Number
    ,os         :String
    ,deviceid   :String
    ,desc       :String
    ,role       :String
    ,customer_id   :ObjectId
});


var taddress=new Schema({
    name:String,
    country:String,
    country_id:Number,
    state:String,
    state_id:Number,
    city:String,
    city_id:Number,
    district:String,
    district_id:Number,
    address1:String,
    address2:String,
    zipcode:String,
});


var tcustomers=new Schema({
    name	:String,
    //address_id:[],
    address:[],
    level:Number,
    phone:String,
    mobile:String,
    email:String,

    customer_type:Number,//个人 公司
    owner:ObjectId,

    flag:Number, //1 代理商 2 客户 0.系统管理员
    create_user:ObjectId,//创建人
    own_user:ObjectId,//拥有者
    create_at  :{type: Number, default: new Date().getTime()},
    last_at	:{type: Number, default: new Date().getTime()},
    actived    :Number,


});



var tcustomer_reports=new Schema({
    name	:String,  //
    address:String,
    contacter:ObjectId,      //联系人
    contacter_post:String,   //职务
    contacter_contactinfo:String,
    Department1:String,    //部门
    Department1_contactinfo:String,  //部门联系方式
    Department2:String,    //部门
    Department2_contactinfo:String,  //部门联系方式
    Department3:String,    //其他部门
    Department3_contactinfo:String,  //部门联系方式

    progress:Number,//项目进展
    costsheet:String, //预算
    purchasingform:String, //采购形式
    predictionsigningtime:Number, //预测签约时间
    competition:String,//竞争对手
    recommenddesc:String, //推荐采购型号描述
    progressdesc:String, //洽谈进展情况详细说明
    needdesc:String,//所需支持
    reportmemo:String,//报备意外情况说明
    conform1:Number,//市场部经理确认
    conform2:Number,//助理确认
    conform3:Number,//公司确认
    xtensionememo:String,//申请报备期限续延说明




    create_at  :{type: Number, default: new Date().getTime()},



});




var initSchema=function (){
    mongoose.model('tusers', tusers);
    mongoose.model('tcustomers', tcustomers);
    mongoose.model('taddress', taddress);

    console.log("init Schema ok");
}

exports.db=mongoose;

exports.init =function (cb){
    //if (mongoose.connected) cb();

    if (mongoose.connection.db) {
        console.log(" mongoose ---ok ");
        cb(mongoose);
        return;
    }

    if(gMongoInstance==1) {
        console.log("db init mongoose conn already connected");
        return;
    }
    gMongoInstance=1;

    console.log("db init mongoose conn");
    var connstr='mongodb://'+mongodb_host+':'+mongodb_port+'/'+mongodb_dbname;
    //var connstr='mongodb://'+config.mongodb_username+':'+config.mongodb_pwd+'@'+config.mongodb_host+':'+config.mongodb_port+'/'+config.mongodb_dbname;
    var serverParms={ server: { auto_reconnect: true,poolSize: mongodb_poolsize }}    ;
    //console.log("connstr",connstr,serverParms);


    mongoose.connect(connstr,serverParms,function(err){
        if (err){
            console.log(err);
        }else{

            initSchema();

            this.db=mongoose;

            if (cb){
                cb(mongoose);
            }

        }
    });
}



