var Device = require('../models/Device');

var DeviceDAO = function () {
};
// 查询全部设备
DeviceDAO.prototype.getAllDevices = function (callback) {
    Device.find({}, function (err, doc) {
        callback(err, doc);
    });
}
// 查询设备by设备id
DeviceDAO.prototype.findById = function (id, callback) {
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
DeviceDAO.prototype.findByName = function (deviceName, callback) {
    Device.find({deviceName: deviceName}, function (err, doc) {
        callback(err, doc);
    });
};

// 添加设备
DeviceDAO.prototype.add = function (obj, callback) {
    var instance = new Device(obj);
    console.log(obj)
    instance.save(function (err) {
        if (err) {
            console.log("Fail save Device" + err);
            callback(err);
        } else {
            callback(null);
        }
    });
}
// 编辑设备
DeviceDAO.prototype.update = function (id, obj, callback) {
    findDeviceById(id, function (err, doc) {
        if (err)
            callback(err);
        else {
            console.log(doc);
            // var _id = person._id; //需要取出主键_id
            // delete person._id;    //再将其删除
            // Device.update({_id:_id},person,function(err){});
            // callback(err, doc);
        }
    });
}
// 删除设备
DeviceDAO.prototype.delete = function (id, callback) {
    findDeviceById(id, function (err, doc) {
        if (err)
            callback(err);
        else {
            console.log('success');
            doc.remove();
            callback(null);
        }
    });
}
var findDeviceById = function (id, callback) {
    Device.findOne({deviceId: id}, function (err, doc) {
        if (err) {
            console.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

module.exports = new DeviceDAO();