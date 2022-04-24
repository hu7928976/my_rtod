
//添加方法到window.$http

//设置请求头的地方
var defaultConfig = {
    header: {
        'Authorization': localStorage.getItem('token')
    },
    timeout: 60 * 1000
}
/**
 * 
 * @param {Stirng,请求路径} url 
 * @param {Object,请求参数} param 
 * @param {Object,单独设置请求配置} config 
 * @returns Promise异步对象 
 */
var postAction = function (url, param, config) {
    return new Promise((reslove, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            data: param,
            headers: {
                Authorization: defaultConfig.header
            },
            timeout: defaultConfig.timeout,
            success: function (res) {
                reslove(res);
            },
            error: function (error) {
                reject(error);
            }
        })
    })

}
/**
 * 
 * @param {Stirng,请求路径} url 
 * @param {Object,请求参数} param 
 * @param {Object,单独设置请求配置} config 
 * @returns Promise异步对象 
 */
var getAction = function (url, param, config) {
    console.log(this)
    url += '?';
    let keys = Object.getOwnPropertyNames(param);
    for (let i = 0; i < keys.length; i++) {
        url += keys[i] + '=' + param[keys[i]] + '&';
    }
    url = url.substring(0, url.length - 1)
    return new Promise((reslove, reject) => {
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                Authorization: defaultConfig.header
            },
            timeout: defaultConfig.timeout,
            success: function (res) {
                reslove(res);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
};
var action = {
    'postAction': postAction,
    'getAction': getAction
};
(function (window) {
    var init = function () {
        return new ajax();
    }
    var ajax = function () {
        let _this = this;
        let keys = Object.getOwnPropertyNames(action);
        for (let i = 0; i < keys.length; i++) {
            _this[keys[i]] = action[keys[i]];
        }
    }
    window.$http = init();
})(window || global)