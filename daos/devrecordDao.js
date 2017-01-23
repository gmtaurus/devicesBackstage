var DeviceRecord = require('../models/DeviceRecord');

var DeviceRecordDAO = function () {
};
// 查询全部设备
DeviceRecordDAO.prototype.getAllRecords = function (callback) {
    DeviceRecord.find({}, function (err, doc) {
        console.log(doc)
        callback(err, doc);
    });
}
// 查询设备by设备id
DeviceRecordDAO.prototype.findById = function (id, callback) {
    findDeviceById(id, function (err, doc) {
        if (err)
            callback(err);
        else {
            console.log(doc);
            callback(err, doc);
        }
    });
};
// 查询设备by设备名称
DeviceRecordDAO.prototype.findByName = function (deviceName, callback) {
    DeviceRecord.findOne({deviceName: deviceName}, function (err, doc) {
        callback(err, doc);
    });
};

var findDeviceById = function (id, callback) {
    DeviceRecord.findOne({deviceId: id}, function (err, doc) {
        if (err) {
            console.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

module.exports = new DeviceRecordDAO();