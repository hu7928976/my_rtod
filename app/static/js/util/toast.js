


(function (window) {
    var options = {
        message: {
            secon: 3000,
            error: '请求失败',
            success: '操作成功',
            warning: '',
            max: 3
        }
    };

    function init() {
        return new Message();
    }
    function createEl(text, className) {
        var el = document.createElement(text);
        el.className = className.join(' ');
        return el;
    }
    function Message() {
        this.body = document.getElementsByTagName('body')[0];
        this.success = function (title, secon) {
            this.showMessage(title, secon || options.secon, ['toast', 'toast-success']);
        }

        this.error = function (title, secon) {
            this.showMessage(title, secon || options.secon, ['toast', 'toast-error']);
        }

        this.warning = function (title, secon) {
            this.showMessage(title, secon || options.secon, ['toast', 'toast-warning']);
        }
        this.showMessage = function (title, secon, className) {
            var _this = this;
            var el = createEl('div', className)
            el.innerText = title;
            var elList = $('.toast');
            var num = elList.length;
            if (num >= options.message.max) {
               return
            }
            if (num > 0) {
                el.style.top = 50 * (num + 1) + 'px';
            }
            this.body.appendChild(el);
            setTimeout(function () {
                _this.hideMessage(el);
            }, secon || options.message.secon)
        }
        this.hideMessage = function (el) {
            this.body.removeChild(el);
        }
    }
    this.$message = init();
})(window || global)