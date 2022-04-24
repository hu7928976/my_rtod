var w = this;
$(function () {
    var Home = function () {
        var _this = this;
        this.init = function () {
            this.method.initStoPro();
            //弹窗方法
            $('#setting').on('click', false, this.method.open);
            //取消
            $('#cancel').on('click', false, this.method.hide);
            //确定
            $('#submit').on('click', false, this.method.submit);
            //切换连接方式
            $('.form-select').on('change', false, this.method.onChange);
            //退出登录
            $('.logout').on('click', false, this.method.logout);
            //添加点击事件  
            $('.updata').on('click', false, this.method.openUpdata);
            $('#cancel1').on('click', false, this.method.hideUpdata);
            $('#submit1').on('click', false, this.method.updata);
            $('.form-box input').on('keydown', false, function (e) {
                var event = e || window.Event;
                var code = event.keyCode || event.which || event.charCode;
                if (code === 13 && $('.model').css('visibility') === 'inherit') {
                    _this.mthod.submit();
                } else if (code === 13 && $('.model1').css('visibility') === 'inherit') {
                    _this.method.updata();
                }
            })
            $('.select-box div').on('click', this.method.onChange)
        }
        this.data = {
            rules: {
                address: {
                    message: 'IP地址不能为空！',
                    reg: /^\S+$/
                },
                netmask: {
                    message: '子网掩码地址不能为空！',
                    reg: /^\S+$/
                },
                gateway: {
                    message: '网关地址不能为空！',
                    reg: /^\S+$/
                },
                dns: {
                    message: 'DNS地址不能为空！',
                    reg: /^\S+$/
                }
            }
        }
        this.method = {
            //获取进度条
            initStoPro: function () {
                var pro = $('.sto-pro');
                for (var i = 0; i < pro.length; i++) {
                    var value = 100 - pro[i].getAttribute('value');
                    $(pro[i]).css('transform', 'translateX(-' + value + '%)');
                }

            },
            //退出登陆
            logout: function () {
                localStorage.clear();
                window.location.href = "/logout"
            },
            //展示
            open: function () {
                $('.mask').css('visibility', 'inherit');
                $('.model').css('visibility', 'inherit')
            },
            openUpdata: function () {
                $('.mask').css('visibility', 'inherit');
                $('.model1').css('visibility', 'inherit')
            },
            hide: function () {
                $('.mask').css('visibility', 'hidden');
                $('.model').css('visibility', 'hidden')
            },
            hideUpdata: function () {
                $('.mask').css('visibility', 'hidden');
                $('.model1').css('visibility', 'hidden')
            },
            //选择连接方式
            onChange: function (e) {
                var event = e || window.Event;
                var els = $('.select-box div');
                for (var i = 0; i < els.length; i++) {
                    els[i].classList.remove('active');
                }
                event.target.classList.add('active');
                console.log(event.target.getAttribute('value'))
                if (event.target.getAttribute('value') === 'static') {
                    $('.dhcp').css('visibility', 'hidden')
                    $('.static').css('visibility', 'inherit')
                } else {
                    $('.static').css('visibility', 'hidden')
                    $('.dhcp').css('visibility', 'inherit')
                }
            },
            //提交的方法
            submit: function () {
                var el = $('.static').css('visibility');
                //设置静态IP
                if (el === 'hidden') {
                    if (!w.confirm('确认修改网络配置为动态IP？')) {
                        return
                    }
                    return w.$http.postAction('/set-network', { bootproto: 'dhcp' })
                        .then(function (res) {
                            //设置成功的回调
                            window.location.href = '/index';
                        })
                }
                var param = { bootproto: 'static' };
                var vals = $('.static .form-box input');
                for (var i = 0; i < vals.length; i++) {
                    var name = vals[i].name;
                    var rules = _this.data.rules[name];

                    var value = vals[i].value;
                    if (!rules.reg.test(value)) {
                        return w.$message.warning(rules.message)
                    }
                    param[name] = value;
                }
                if (!w.confirm('确认修改网络配置？')) {
                    return
                }
                w.$http.postAction('/set-network', param)
                    .then(function (res) {
                        w.$message.success('操作成功')
                        //设置成功的回调
                        _this.method.hide();
                        setTimeout(function () {
                            window.location.href = param.address + '/index';
                        }, 3000)
                    })
            },
            //修改密码
            updata() {
                var vals = $('.model1 .form-box input');
                var param = {};
                for (var i = 0; i < vals.length; i++) {
                    var name = vals[i].name;
                    var value = vals[i].value;
                    console.log(name, value)
                    if (!/^\S+$/.test(value)) {
                        return w.$message.warning(vals[i].placeholder)
                    }
                    param[name] = value;
                }
                if (param.newPassWord !== param.newPassWord1) {
                    return w.$message.warning('重复密码输入不一致！');
                }
                //检查旧密码是否正确
                w.$http
                    .postAction('/check_password', { password: param.oldPassWord })
                    .then(function (res) {
                        if (res.msgCode != 200) {
                            return w.$message.warning('旧密码输入错误！')
                        }
                        if (!w.confirm('确认修改密码？')) {
                            return
                        }
                        w.$http
                            .postAction('/changepwd', param)
                            .then(function (res) {
                                w.$message.success('修改成功')
                                localStorage.clear();
                                window.location.href = '/logout';
                            })
                    })

            }
        }

    }
    new Home().init();
    //打开

})