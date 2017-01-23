var Devices = require('../daos/deviceDao');
var logger = require('../conf/log4js').getLogger('routes.devicesList');
// 设备列表
exports.showDeviceList = function (req, res) {
    logger.info(req.body);
    var display = req.params.display;
    Devices.getAllDevices(function (err, obj) {
        if (err) {
            req.session.error = '展示设备列表失败,请重试';
        } else {
            req.session.success = '展示设备列表成功';
            return res.send(obj);
            // if (display == 'json') {
            //     return res.send(obj);
            // } else {
            //     return res.render('devicesList', {
            // data: obj});
            // }            
        }
    });
};
// 展示单个设备信息
exports.showDevice = function (req, res) {
    logger.info(req.query.deviceId);
    console.log(req.query.deviceId);
    var id = req.query.deviceId;
    if (id) {
        // 展示该id的详细信息
        Devices.findById(id, function (err, obj) {
            if (err) {
                req.session.error = '展示设备信息失败,请重试';
            } else {
                req.session.success = '展示信息成功';
                return res.send(obj);
            }
        });

    } else {
        var obj = {};
        obj.error_no = 1000;
        obj.error_msg = '设备id不能为空!';
        return res.send(obj);
    }
};
// 查询全部设备
exports.findAllDevices = function (req, res) {
    logger.info(req.body);
    Devices.getAllDevices(function (err, obj) {
        if (err) {
            req.session.error = '查询设备列表失败,请重试';
        } else {
            req.session.success = '查询设备列表成功';
            return res.send(obj);            
        }
    });
}
// 查询设备by设备id
exports.findDeviceById = function (req, res) {
    logger.info(req.params.id);
    var id = req.params.id;
    if (id) {
        // 展示该id的详细信息
        Devices.findById(id, function (err, obj) {
            if (err) {
                req.session.error = '查询设备信息失败,请重试';
            } else {
                req.session.success = '查询信息成功';
                return res.send(obj);
            }
        });

    } else {
        return res.redirect('/');
    }
}
// 查询设备by设备name
exports.findDeviceByName = function (req, res) {
    logger.info(req.params.name);
    var name = req.params.name;
    Devices.findByName(name, function (err, obj) {
        if (err) {
            req.session.error = '查询设备信息失败,请重试';
        } else {
            req.session.success = '查询信息成功';
            return res.send(obj);
        }
    });
}
// 添加或更新设备信息
exports.doAddDevice = function (req, res) {
    logger.info(req.body);
    var params = req.query;
    var id = req.params.id;
    if (id) {
        Devices.update(id, params, function (err, obj) {
            if (err) {
                req.session.error = '更新设备信息失败,请重试';
            } else {
                req.session.success = '更新设备信息成功';
                return res.send(obj);
            }
        });
    } else {
        Devices.add(params, function (err, obj) {
            if (err) {
                req.session.error = '添加设备信息失败,请重试';
            } else {
                req.session.success = '添加设备信息成功';
                if (obj) {
                    obj.error_no=0;
                } else {
                    obj = {};
                    obj.error_no =0;
                }
                return res.send(obj);
            }
        });
    }

};
// 删除设备
exports.deleteDevice = function (req, res) {
    logger.info(req.params.id);
    var id = req.params.id;
    Devices.delete(id, function (err, body) {
        if (err) {
            req.session.error = '添加设备信息失败,请重试';
        } else {
            req.session.success = '添加设备信息成功';
            return res.send(body);
        }
    });
}