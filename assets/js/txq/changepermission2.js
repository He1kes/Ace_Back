const permission = new Vue({
    el: '#permission',
    data: {
        level_1: null,
        level_2: null,
        myLevel_1: null,
        myLevel_2: null,
        //功能是否被选中标记二维数组
        functionFlag: new Array(),
        //li的打开标记
        openFlag: new Array()
    },
    methods: {
        //拿所有权限
        findFunction() {
            let that = this;
            axios({
                method: 'get',
                url: txqIp + '/user/function/back/findFunction',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    if (result.data != null && result.data.data != null) {
                        that.level_1 = result.data.data[0];
                        that.level_2 = result.data.data[1];
                        //循环所有一级权限
                        for (let i = 0; i < that.level_1.length; i++) {
                            //为li的打开标记赋值
                            that.openFlag[i] = false;
                            //如果该一级权限下对应的二级权限长度大于0（有二级权限）
                            if (that.level_2[i].length > 0 ) {
                                //设置对应数的组
                                that.functionFlag[i] = new Array();
                                //为对应数组赋值
                                for (let j = 0; j < that.level_2[i].length; j++) {
                                    that.functionFlag[i][j] = false;
                                    for (let m = 0; m < that.myLevel_1.length; m++) {
                                        for (let n = 0; n < that.myLevel_2[m].length; n++) {
                                            if (that.level_2[i][j].address == that.myLevel_2[m][n].address) {
                                                that.functionFlag[i][j] = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                //无二级权限
                                that.functionFlag[i] = false;
                                //判断该一级权限是否在我的权限中
                                for (let k = 0; k < that.myLevel_1.length; k++) {
                                    if (that.level_1[i].address == that.myLevel_1[k].address) {
                                        that.functionFlag[i] = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                });
        },
        //拿角色的权限
        async findFunction2() {
            let roleId = location.search;
            roleId = roleId.substring(roleId.lastIndexOf('=') + 1);
            let that = this;
            await axios({
                method: 'get',
                url: txqIp + '/user/function/back/findFunction',
                params: {'roleId': roleId},
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    if (result.data != null && result.data.data != null) {
                        that.myLevel_1 = result.data.data[0];
                        that.myLevel_2 = result.data.data[1];
                    }
                });
            this.findFunction();
        },
        openLi(index) {
            Vue.set(this.openFlag, index, !this.openFlag[index]);
        },
        checkAll(index, event) {
            for (let i = 0; i < this.functionFlag[index].length; i++) {
                Vue.set(this.functionFlag[index], i, event.target.checked);
            }
        }
    },
    created: function () {
        this.findFunction2();
    }
});