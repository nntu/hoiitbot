var Datastore = require('nedb');

db = new Datastore({
    filename: 'linkanh.db',
    autoload: true
  });

var doc ={
'url':'https://lh3.googleusercontent.com/3vyTR5g68aaRxhGyr8E0Ovbs3DUqQ40C7Zqwo3f0V3nxtdC1-QX74uXLr5fi2la-XQ8c093Gc3yIb83ekYUQBOtKFZkToF-MNixhkFtB73Dpkjhg-NPwz2qLe5WL0RUPwYQjxQIG7AwfGNIWQtL05vI_ArOtoiaD-U6lxxH62v5JVJNLXdkp5E_7vvNV9ke6xHAmSoNAbRQOVbrJIi0r3g3RmzvLXGeL2tBOrUMDE0-C6vKFMPPp0nTEfPbEdjEBgmprILRgf_0B9O9GD36NQVmEfc-onYVtHSj2cvUtGbtXyF5ynwxOC2yrMc7QXGIa_Hp6Er9NuVWD37DZa17vF8_2o4HA3D_TnDk_2T67xx82UVhVQNet-ZACrLYymoarQSNIwB9V5ESiZlFGFr-wKjdokRVkp1KzDUIb73DCOKQ9oUwc_o_OibGx-0iLmKbIf8UWIVl-k6h-TaJ3njOS2Lp7k7EMRNvu-zAvF0zgi_ZvQGm_cGhbr-8P5tx8JGHAbLMJVWskqSYdt6q58AbuLTCSumsa2g1DcFFer6cCOwJ-FNGQE3OeDh1TVtcVg7panAo8FO2t-YbEmsSRGNlR-JyOg1W_rbrnua9OA2bwEnIb6V6IcK8mzRM-iRMvaT9rOK8VK77Ly1kRCdfVroHW6d3eC_aFSqxU81cEBuTV-ngzl3Fn05xLvgOvo_m8s-PztIokHOGRQhGrfGFMvRbJT91H=w1125-h750-no',
'loai':'hotgirl'    
}


  

db.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
  });