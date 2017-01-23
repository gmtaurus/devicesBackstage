/**
 * Created by gaomin on 16-10-16.
 */
var util = require('util');
var mongodb = require('../conf/mongodb');
var Schema = mongodb.mongoose.Schema;

/**
 * @type {Schema}
 */
var DevicesSchema = new Schema({
    'deviceId': String,
    'deviceName': String,
    'IMEI': String,
    'storageTime': {type: Date, default: Date.now},
    'deviceState': Number,
    'borrowState': Number
},
{collection: 'devicesBaseInfo'}
);

// 创建Devices的mongodb模型
var Device = mongodb.mongoose.model('devicesBaseInfo', DevicesSchema);

module.exports = Device;