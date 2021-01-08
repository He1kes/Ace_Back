const login = new Vue({
    el: '#login-box',
    data: {
        userAccount: null,
        password: null,
        loginFlag: false,
        loginMessage: ''
    },
    methods: {
        clearForm() {
            this.userAccount = null;
            this.password = null;
            this.loginFlag = false;
            this.loginMessage = '';
        },
        doManageLogin() {
            let that = this;
            let userAccount = that.userAccount;
            let password = that.password;
            if (userAccount != null && userAccount != '' && password != null && password != '') {
                let formData = new FormData();
                formData.append('userAccount', userAccount);
                formData.append('password', password);
                axios({
                    method: 'post',
                    url: txqIp + '/user/front/public/doManageLogin',
                    data: formData,
                })
                    .then(
                        result => { //data[0]为登录标记、data[1]为token、data[2]用户id、data[3]用户角色
                            if (result.data.data[0] == 0) {
                                this.loginFlag = true;
                                this.loginMessage = result.data.message;
                            } else {
                                if (result.data.data[3] == 3) {//等于3则判断为商户登录
                                    localStorage.setItem('token',result.data.data[1]);
                                    localStorage.setItem('userId', result.data.data[2]);
                                    window.location.href = 'businesses.html';
                                } else { //否则为管理员登录
                                    localStorage.setItem('token',result.data.data[1]);
                                    localStorage.setItem('userId', result.data.data[2]);
                                    window.location.href = 'admin.html';
                                }
                            }
                        }
                    );
            } else {
                this.loginFlag = true;
                this.loginMessage = '请将信息填写完整！';
            }
        }
    }
});

const resetPassword = new Vue({
    el: '#forgot-box',
    data: {
        phoneNumber: null,
        phoneCode: null,
        resetFlag: false,
        resetMessage: ''
    },
    methods: {
        clearForm() {
            this.phoneNumber = null;
            this.phoneCode = null;
            this.resetFlag = false;
            this.resetMessage = '';
        },
        getFindPhoneCode() {
            let phoneNumber = this.phoneNumber;
            let that = this;
            if (phoneNumber != null && phoneNumber != '') {
                axios.get(txqIp + '/user/front/public/getFindPhoneCode', {params: {phoneNumber: phoneNumber}})
                    .then(function (result) {
                        if (result.data.data == -1) {
                            //等于-1，手机号未绑定
                            that.resetMessage = result.data.message;
                            //显示错误信息
                            that.resetFlag = true;
                        } else {
                            that.resetMessage = '';
                            that.resetFlag = false;
                        }
                    });
            }
        },
        resetPassword() {
            let phoneNumber = this.phoneNumber;
            let phoneCode = this.phoneCode;
            let that = this;
            if (phoneCode != null && phoneCode != '' && phoneNumber != null && phoneNumber != '') {
                let formData = new FormData();
                formData.append('phoneNumber', phoneNumber);
                formData.append('phoneCode', phoneCode);
                axios.post(txqIp + '/user/front/public/resetPassword', formData)
                    .then(function (result) {
                        if (result.data.data == true) {
                            that.resetMessage = '';
                            that.resetFlag = false;
                            this.clearForm();
                            alert('密码已重置为000000，请在登录后及时更改！');
                        } else {
                            that.resetMessage = result.data.message;
                            //显示错误信息
                            that.resetFlag = true;
                        }
                    });
            }
        }
    }
});