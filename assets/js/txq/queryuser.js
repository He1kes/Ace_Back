const userTable = new Vue({
    el: '#userTable',
    data: {
        //查询是否有数据标记
        selectFlag: true,
        page: {
                //当前页
                pageNum: 1,
                //每页的数量
                pageSize: 5,
                //总页数
                pages: 0,
                //所有导航页号
                navigatepageNums: new Array(),
                //总记录数
                total: 0,
                //结果集
                list: null
            },
        form: {
            userName: null,
            userAccount: null,
            abc: null,
            roles: new Array(),
            roleId: 0
        },
        //选择框标记
        check: new Array(),
        checkAll: false,
        myRoleId: localStorage.getItem('roleId')
    },

    mounted: function () {
        this.getRoles();
        this.getUserList(1);
    },

    methods: {
        getRoles() {
            let that = this;
            axios({
                method: 'get',
                url: txqIp + '/user/back/getRoles',
                headers: {
                    'token': localStorage.getItem('token'),
                    'roleId': localStorage.getItem('roleId')
                }
            })
                .then(function (result) {
                   that.form.roles = result.data.data;
                });
        },
        changeRoleId(event) {
            this.form.roleId = event.target.value;
        },
        getUserList(pageNum) {
            let that = this;
            let formData = new FormData();
            formData.append('pageNum', pageNum);
            formData.append('pageSize', 2);
            formData.append('userAccount',this.form.userAccount == null ? '' : this.form.userAccount);
            formData.append('userName', this.form.userName == null ? '' : this.form.userName);
            formData.append('roleId', this.form.roleId);
            axios({
                method: 'post',
                url: txqIp + '/user/back/getUserList',
                data: formData,
                headers: {
                    'token': localStorage.getItem('token'),
                    'roleId': localStorage.getItem('roleId')
                }
            })
                .then(function (result) {
                    that.page = result.data.data;
                    if (result.data.data.list != null && result.data.data.list.length > 0) {
                        that.selectFlag = true;
                        for (let i = 0; i < result.data.data.list.length; i++) {
                            that.check[i] = false;
                        }
                    } else {
                        that.selectFlag = false;
                    }
                });
        },
        prevPage() {
            if (this.page.pageNum > 1) {
                let pageNum = this.page.pageNum - 1 >= 1 ? this.page.pageNum - 1 : 1;
                this.getUserList(pageNum);
            }
        },
        nextPage() {
            if (this.page.pageNum < this.page.pages) {
                let pageNum = this.page.pageNum + 1 <= this.page.pages ? this.page.pageNum + 1 : this.page.pages;
                this.getUserList(pageNum);
            }
        },
        checkBox(index) {
            this.check[index] = !this.check[index];
        },
        allCheck() {
            this.checkAll = !this.checkAll;
            if (this.check.length > 0) {
                for (let i = 0; i < this.check.length; i++) {
                    this.check[i] = this.checkAll;
                }
          }
        },
        //封禁用户
        async bannedUser(userId, userStatus) {
            let that = this;
            let formData = new FormData();
            formData.append('userId', userId);
            formData.append('userStatus', userStatus);
            await axios({
                method: 'post',
                url: txqIp + '/user/back/bannedUser',
                data: formData,
                headers: {
                    'token': localStorage.getItem('token'),
                    'roleId': localStorage.getItem('roleId')
                }
            })
                .then(function (result) {
                    if (result.data.data == true) {
                        that.getUserList(that.page.pageNum);
                    } else {
                        alert('操作失败');
                    }
                });
        },
        //密码重置
        async resetPassword(userId) {
            let that = this;
            let formData = new FormData();
            formData.append('userId', userId);
            await axios({
                method: 'post',
                url: txqIp + '/user/back/resetPassword',
                data: formData,
                headers: {
                    'token': localStorage.getItem('token'),
                    'roleId': localStorage.getItem('roleId')
                }
            })
                .then(function (result) {
                    if (result.data.data == true) {
                        alert('密码已成功重置为000000，请通知用户尽快修改');
                    } else {
                        alert('操作失败');
                    }
                });
        }
    }
});