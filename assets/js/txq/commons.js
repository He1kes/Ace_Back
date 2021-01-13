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
                    that.imgSrc = result.data.data.userImage;
                    that.userName = result.data.data.userName;
                });
        }
    },
    created: function () {
        this.getUserMessage();
    }
});