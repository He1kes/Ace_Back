const addManager = new Vue({
    el: '#addManager',
    data: {
        form: {
            userName: null,
            userNameFlag: false,
            userNameMessage: '',
            userAccount: null,
            userAccountFlag: false,
            userAccountMessage: '',
            password: null,
            passwordFlag: false,
            passwordMessage: '',
            surePassword: null,
            surePasswordFlag: false,
            surePasswordMessage: '',
            phone: null,
            phoneFlag: false,
            phoneMessage: ''
        },
        addFlag: false,
        addMessage: ''
    },
    methods: {
        addManager() {
            let that = this;
            if (this.form.userNameFlag &&
                this.form.userAccountFlag &&
                this.form.passwordFlag &&
                this.form.surePasswordFlag && this.form.phoneFlag) {

                this.addFlag = false;
                this.addMessage = '';

                let formData = new FormData();
                formData.append('userName', this.form.userName);
                formData.append('userAccount', this.form.userAccount);
                formData.append('password', this.form.password);
                formData.append('phone', this.form.phone);
                //设置默认头像
                formData.append('userImage', 'assets/images/avatars/user.jpg');

                axios({
                    method: 'post',
                    url: txqIp + '/user/back/private/addManager',
                    data: formData,
                    headers: {
                        'token': localStorage.getItem('token'),
                        'roleId': localStorage.getItem('roleId')
                    }
                })
                    .then(
                        result => {
                            if (result.data.data == true) {
                                alert('添加成功！')
                                that.clearForm();
                            } else {
                                alert('添加失败！');
                            }
                        }
                    );
            }else {
                this.addFlag = true;
                this.addMessage = '请将信息填写完善';
            }
        },
        clearForm() {
            this.form.userName = null,
            this.form.userNameFlag=false,
            this.form.userNameMessage= '',
            this.form.userAccount= null,
            this.form.userAccountFlag=false,
            this.form.userAccountMessage='',
            this.form.password=null,
            this.form.passwordFlag=false,
            this.form.passwordMessage='',
            this.form.surePassword=null,
            this.form.surePasswordFlag=false,
            this.form.surePasswordMessage='',
            this.form.phone=null,
            this.form.phoneFlag=false,
            this.form.phoneMessage=''
            this.addFlag=false,
            this.addMessage=''
        }
        },
    watch: {
        'form.userName': function (newVal) {
            let val = newVal == null ? '' : newVal.trim();
            this.form.userName = val;
            if (val != null && val != '') {
                this.form.userNameFlag = true;
                this.form.userNameMessage = '';
            } else {
                this.form.userNameFlag = false;
                this.form.userNameMessage = '';
            }
        },
        'form.userAccount': function (newVal) {
            let val = newVal == null ? '' : newVal.trim();
            this.form.userAccount = val;
            if (val != null && val != '') {
                if (val.length >= 6 && val.length <= 12) {
                    let that = this;
                    axios({
                        method: 'get',
                        url: txqIp + '/user/front/public/checkAccount',
                        params: {userAccount: val}
                    })
                        .then(function (result) {
                            if (result.data.data == true) {
                                that.form.userAccountFlag = true;
                                that.form.userAccountMessage = '';
                            } else {
                                that.form.userAccountFlag = false;
                                that.form.userAccountMessage = result.data.message;
                            }
                        });
                } else {
                    this.form.userAccountFlag = false;
                    this.form.userAccountMessage = '用户名长度位6-12位';
                }
            } else {
                this.form.userAccountFlag = false;
                this.form.userAccountMessage = '';
            }
        },
        'form.password': function (newVal) {
            let val = newVal == null ? '' : newVal.trim();
            this.form.password = val;
            if (newVal != null && newVal != '') {
                if (val.length >= 6 && val.length <= 12) {
                    this.form.passwordFlag = true;
                    this.form.passwordMessage = '';
                } else {
                    this.form.passwordFlag = false;
                    this.form.passwordMessage = '密码长度为6-12位';
                }
            } else {
                this.form.passwordFlag = false;
                this.form.passwordMessage = '';
            }
        },
        'form.surePassword': function (newVal) {
            if (this.form.passwordFlag == true) {
                if (newVal != null && newVal != '') {
                    if (newVal != this.form.password) {
                        this.form.surePasswordFlag = false;
                        this.form.surePasswordMessage = '两次输入密码不一致';
                    } else {
                        this.form.surePasswordFlag = true;
                        this.form.surePasswordMessage = '';
                    }
                } else {
                    this.form.surePasswordFlag = false;
                    this.form.surePasswordMessage = '';
                }
            } else {
                this.form.surePasswordFlag = false;
                if (newVal != null && newVal != '') {
                    this.form.surePasswordMessage = '请先填写密码';
                }
                else {
                    this.form.surePasswordMessage = '';
                }
            }
        },
        'form.phone': function (newVal) {
            this.form.phone = this.form.phone == null ? this.form.phone :this.form.phone.trim();
            let phone = this.form.phone;
            if (phone != null && phone != '') {
                let regExp = /^1[3|4|5|7|8|9][0-9]{9}$/;
                if (regExp.test(phone)) {
                    let that = this;
                    axios({
                        method: 'get',
                        url: txqIp + '/user/front/public/checkPhone',
                        params: {phone: phone}
                    })
                        .then(function (result) {
                            if (result.data.data == true) {
                                that.form.phoneMessage = '';
                                that.form.phoneFlag = true;
                            } else {
                                that.form.phoneFlag = false;
                                that.form.phoneMessage = result.data.message;
                            }
                        });

                } else {
                    this.form.phoneFlag = false;
                    this.form.phoneMessage = '手机号不符合要求';
                }
            } else {
                this.form.phoneFlag = false;
                this.form.phoneMessage = '';
            }
        }
    }
});