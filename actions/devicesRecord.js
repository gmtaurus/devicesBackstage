var DevicesRecord = require('../daos/devrecordDao');
var logger = require('../conf/log4js').getLogger('routes.devicesRecord');
// 设备列表
exports.showRecordsList = function (req, res) {
    logger.info(req.body);
    var display = req.query.display;
    DevicesRecord.getAllRecords(function (err, obj) {
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
// 查询全部设备
exports.findAllRecords = function (req, res) {
    logger.info(req.body);
    DevicesRecord.getAllRecords(function (err, obj) {
        if (err) {
            req.session.error = '查询设备列表失败,请重试';
        } else {
            req.session.success = '查询设备列表成功';
            return res.send(obj);            
        }
    });
}
// 查询设备by设备id
exports.findRecordById = function (req, res) {
    logger.info(req.params.id);
    var id = req.params.id;
    if (id) {
        // 展示该id的详细信息
        DevicesRecord.findById(id, function (err, obj) {
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