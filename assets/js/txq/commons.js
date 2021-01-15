let txqIp = 'http://192.168.0.16:8888';
const loginDiv = new Vue({
    el: '#loginDiv',
    data: {
        imgSrc: 'assets/images/avatars/user.jpg',
        userName: 9527
    },
    methods: {
        loginOut() {
            axios({
                methods: 'get',
                url: txqIp + '/user/front/private/loginOut',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    if (result.data.flag == true) {
                        window.location.href = 'mylogin.html';
                    } else {
                        alert(result.data.message);
                    }
                });
        },
        getUserMessage() {
            let that = this;
            axios({
                method: 'get',
                url: txqIp + '/user/front/private/getUserMessage',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    if (result.data != null && result.data.data != null) {
                        that.imgSrc = result.data.data.userImage;
                        that.userName = result.data.data.userName;
                    } else {
                        window.location.href = 'mylogin.html';
                    }
                });
        }
    },
    created: function () {
        this.getUserMessage();
    }
});

const functions = new Vue({
    el: '#theFunction',
    data: {
        //一级列表
        level_1: null,
        //存储二级列表的集合
        level_2: null
    },
    methods: {
        getFunction() {
            let that = this;
            axios({
                method: 'get',
                url: txqIp + '/user/function/back/getFunction',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    if (result.data != null && result.data.data != null) {
                        that.level_1 = result.data.data[0];
                        that.level_2 = result.data.data[1];
                    }
                });
        }
    },
    mounted: function () {
        this.getFunction();
    }
});