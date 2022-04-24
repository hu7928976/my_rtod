var _this = this;
$(function () {
    var submit = function () {
        var password = $('#password').val();
        if (!/^\S+$/.test(password)) {
            return window.$message.error('密码不能为空!');
        }
        //url 请求接口路径  data 请求参数
        var data = {
            password: password
        }
        _this.$http.postAction('/login', data).then(function (res) {
            //密码正确
            if (res.msgCode == 200) {
                //页面跳转
                window.location.href = '/index';
            } else {
                //密码失败或者其他错误信息
                _this.$message.error(res.msgInfo)
            }

        })
    }
    $('#password').on('keydown', false, function (e) {
        var event = e || window.Event;
        var code = event.keyCode || event.which || event.charCode;
        if (code === 13) {
            submit();
        }
    })
    $('#submit').on('click', false, submit)
})