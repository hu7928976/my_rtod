var w = this;

$(function () {
    var Auth = function () {
        var _this = this;
        this.init = function () {
            this.data = {
                optionEl: $('.options'),
                ids: ['code', 'sacn'],
                timer: null
            };
            //二维码授权时自动调用
            this.methods.checkAuth();
            this.data.optionEl.on('click', false, this.methods.selectOption);
            $("#next").on('click', false, this.methods.next);
            $('.form-input').on('keydown', false, function (e) {
                var event = e || window.Event;
                var code = event.keyCode || event.which || event.charCode;
                if (code === 13) {
                    _this.methods.next();
                }
            });
            document.onkeydown = function (e) {
                var event = e || window.Event;
                var code = event.keyCode || event.which || event.charCode;
                if (code === 13 && $('#success').css('display') === 'block') {
                    _this.methods.submit();
                }
            }
        };
        //初始化方法

        this.methods = {
            selectOption: function (e) {
                var event = e || window.Event;
                for (var i = 0; i < _this.data.optionEl.length; i++) {
                    _this.data.optionEl[i].classList = ['options'];
                };
                var el = event.target;
                var id = '#' + el.getAttribute('name');
                el.classList.add('options-active');
                _this.data.ids.forEach((v) => {
                    $('#' + v).css('display', 'none');
                })
                $(id).css('display', 'block');
            },
            //授权码方式授权
            next: function (event) {
                //授权码
                let code = $('.form-input')[0].value;
                console.log(/^\S+$/.test(code))
                if (!/^\S+$/.test(code)) {
                    return w.$message.warning('请输入授权码')
                }
                //post请求
                w.$http
                    .postAction('/grant', {
                        authtype: 1,
                        authcode: code
                    })
                    .then(function (res) {
                        switch (res.msgCode) {
                            case '200':
                                _this.methods.successCallback();
                                break
                            case '20000':
                                w.$message.error(res.msgInfo)
                                _this.methods.errorCallback();
                                break
                            case '302':
                                _this.methods.successCallback();
                                break
                            case '404':
                                w.$message.error('连接错误')
                                break
                            default:
                                _this.methods.errorCallback();
                        }
                        // if (res.msgCode === '200') {
                        //     //授权成功
                        //     _this.methods.successCallback();
                        // } else {
                        //     //授权失败
                        //     w.$message.error(res.msgInfo)
                        //     _this.methods.errorCallback();
                        // }
                    });
            },
            //二维码授权
            checkAuth: function () {
                _this.data.timer = setTimeout(function () {
                    w.$http
                        .postAction('/grant', {
                            authtype: 2
                        })
                        .then(function (res) {
                            switch (res.msgCode) {
                                case '200':
                                    _this.methods.successCallback();
                                    clearTimeout(timer);
                                    localStorage.clear()
                                    break
                                case '20000':
                                    _this.methods.checkAuth()
                                    break
                                case '302':
                                    _this.methods.successCallback();
                                    clearTimeout(timer);
                                    localStorage.clear()
                                    break
                                case '404':
                                    w.$message.error('连接错误')
                                    break
                                default:
                                    _this.methods.checkAuth()
                            }
                            //授权成功清除定时器 根据是否有返回值检测是否二维码授权成功
                            // if (res.msgCode === '200') {

                            // } else if (res.msgCode == 20000) {

                            // } else {
                            //    ;
                            // }
                        })

                }, 5000);
            },
            //授权成功的回调函数
            successCallback: function () {
                $('.step-line').css('background-color', '#4FADFF');
                $('.step-img')[1].setAttribute('src', '../static/assets/image/success2.png');
                $('#start').css('display', 'none');
                $('#success').css('display', 'block');
                $('#submit').on('click', false, _this.methods.submit)
            },
            //授权失败的回调
            errorCallback: function () {
                $('.step-line').css('background-color', '#EA5442');
                $('.step-img')[0].setAttribute('src', '../static/assets/image/error.png');
                $('.step-img')[1].setAttribute('src', '../static/assets/image/error2.png');
                $('#start').css('display', 'none');
                $('#error').css('display', 'block');
                $('#reset').on('click', false, _this.methods.reset)
            },
            //开始使用
            submit: function () {
                window.location.href = '/index';
            },
            //初始化状态
            reset: function () {
                $('.step-line').css('background-color', '#4FADFF');
                $('.step-img')[0].setAttribute('src', '../static/assets/image/success.png');
                $('.step-img')[1].setAttribute('src', '../static/assets/image/default.png');
                $('#start').css('display', 'block');
                $('#error').css('display', 'none');
                $('#submit').unbind('click');
            }
        }
    }
    new Auth().init();
})