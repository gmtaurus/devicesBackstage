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
    
},
{collection: 'deviceBorrowRecords'}
);

// 创建Devices的mongodb模型
var DeviceRecord = mongodb.mongoose.model('deviceBorrowRecords', DevicesSchema);

module.exports = DeviceRecord;