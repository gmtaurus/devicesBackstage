/**
 * Created by gaomin on 16-10-16.
 *
 * 路由控制模块
 */
var devicesList = require('../actions/devicesList');
var devicesRecord = require('../actions/devicesRecord');
var user = require('../actions/users');
exports.routes = function(app){
    // 用户信息相关
    app.get('/home', authentication);
    app.get('/home', user.home);

    // 登录
    app.all('/login', noAuthentication);
    app.get('/login', user.login);
    app.post('/login', user.doLogin);

    // 退出
    app.get('/logout', authentication);
    app.get('/logout', user.logout);

    // 注册
    app.all('/reg', noAuthentication);
    app.get('/reg', user.reg);
    app.post('/reg', user.doReg);
    // 设备信息相关
    // 设备列表
    app.get('/device', devicesList.showDeviceList);

    // 添加和更新
    app.get('/device/show', devicesList.showDevice);
    app.get('/device/add', devicesList.doAddDevice);
    app.post('/device/add', devicesList.doAddDevice);
    app.get('/device/add/:id', devicesList.doAddDevice);
    app.post('/device/add/:id', devicesList.doAddDevice);

    // 查询
    app.get('/device/query/', devicesList.findAllDevices);
    app.get('/device/query/:id', devicesList.findDeviceById);
    app.get('/device/query/:name', devicesList.findDeviceByName);
    // 删除
    app.get('/device/delete/:id', devicesList.deleteDevice);

    // 设备记录信息相关
    // 设备记录列表
    app.get('/devrecord', devicesRecord.showRecordsList);

    // 查询
    app.get('/devrecord/query/', devicesRecord.findAllRecords);
    app.get('/devrecord/query/:id', devicesRecord.findRecordById);
}

// 认证访问控制
// 未认证
function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登录';
        return res.redirect('/login');
    }
    next();
}

// 已认证
function noAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登录';
        return res.redirect('/home');
    }
    next();
}