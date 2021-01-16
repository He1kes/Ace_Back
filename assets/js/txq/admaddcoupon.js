const coupon = new Vue({
    el: '#coupon',
    data: {
        couponName: null,
        couponNameFlag: false,
        couponDesc: null,
        couponDescFlag: false,
        couponCount: 1,
        couponCountFlag: true,
        couponSeveral: 1,
        couponSeveralFlag: true,
        startDate: null,
        startDateFlag: false,
        endDate: null,
        endDateFlag: false,
        couponType: 0,
        couponCondition: null,
        couponConditionFlag: false,
        couponContent1: null,
        couponContent1Flag: false,
        couponContent2: 10,
        addFlag: false
    },
    methods: {
        deCount() {
            if (this.couponCount -1 > 0) {
                this.couponCount = --this.couponCount;
            } else {
                this.couponCount = 1;
            }
        },
        addCount() {
            this.couponCount = ++this.couponCount;
        },
        deSeveral() {
            if (this.couponSeveral -1 > 0) {
                this.couponSeveral = --this.couponSeveral;
            } else {
                this.couponSeveral = 1;
            }
        },
        addSeveral() {
            this.couponSeveral = ++this.couponSeveral;
        },
        deContent() {
            if (this.couponContent2 - 0.1 > 0) {
                this.couponContent2 = this.couponContent2 - 0.1;
            } else {
                this.couponContent2 = 10;
            }
        },
        addContent() {
            if (this.couponContent2 + 0.1 < 10) {
                this.couponContent2 = this.couponContent2 + 0.1;
            } else {
                this.couponContent2 = 10;
            }
        },
        addCoupon() {
            if (this.couponType == 0) {
                if (this.couponNameFlag
                    && this.couponDescFlag
                    && this.couponCountFlag
                    && this.couponSeveralFlag
                    && this.startDateFlag
                    && this.endDateFlag
                    && this.couponConditionFlag
                    && this.couponContent1Flag) {
                    this.addFlag = false;
                    let that = this;
                    let formData = new FormData();
                    formData.append('couponTitle', this.couponName);
                    formData.append('couponDesc', this.couponDesc);
                    formData.append('couponCount', this.couponCount);
                    formData.append('couponSeveral', this.couponSeveral);
                    formData.append('couponStart', this.startDate);
                    formData.append('couponEnd', this.endDate);
                    formData.append('couponType', this.couponType);
                    formData.append('couponCondition', this.couponCondition);
                    formData.append('couponContent', this.couponContent1);
                    formData.append('couponScope', -1);

                    axios({
                        method: 'post',
                        url: txqIp + '/coupon/back/addCoupon',
                        data: formData,
                        headers: {
                            'token': localStorage.getItem('token')
                        }
                    })
                        .then(function (result) {
                            if (result.data.data == true) {
                                alert('请求已提交，请稍后查看！');
                                //that.clearForm();
                            } else {
                                alert('添加失败');
                            }
                        });
                } else {
                    this.addFlag = true;
                }
            } else {
                if (this.couponNameFlag
                    && this.couponDescFlag
                    && this.couponCountFlag
                    && this.couponSeveralFlag
                    && this.startDateFlag
                    && this.endDateFlag
                    && this.couponConditionFlag) {
                    this.addFlag = false;
                    let that = this;
                    let formData = new FormData();
                    formData.append('couponTitle', this.couponName);
                    formData.append('couponDesc', this.couponDesc);
                    formData.append('couponCount', this.couponCount);
                    formData.append('couponSeveral', this.couponSeveral);
                    formData.append('couponStart', this.startDate);
                    formData.append('couponEnd', this.endDate);
                    formData.append('couponType', this.couponType);
                    formData.append('couponCondition', this.couponCondition);
                    formData.append('couponContent', this.couponContent2);
                    formData.append('couponScope', -1);

                    axios({
                        method: 'post',
                        url: txqIp + '/coupon/back/addCoupon',
                        data: formData,
                        headers: {
                            'token': localStorage.getItem('token')
                        }
                    })
                        .then(function (result) {
                            if (result.data.data == true) {
                                alert('请求已提交，请稍后查看！');
                                //that.clearForm();
                            } else {
                                alert('添加失败');
                            }
                        });
                } else {
                    this.addFlag = true;
                }
            }
        }
    },
    watch: {
        couponName: function(newVal) {
            if (newVal != null && newVal != '') {
                this.couponNameFlag = true;
            } else {
                this.couponNameFlag = false;
            }
        },
        couponDesc: function(newVal) {
            if (newVal != null && newVal != '') {
                this.couponDescFlag = true;
            } else {
                this.couponDescFlag = false;
            }
        },
        couponCount: function (newVal) {
            let regExp = /^[1-9]\d*$/;
            if (!regExp.test(newVal)) {
                this.couponCount = 1;
            }
        },
        couponSeveral: function(newVal) {
            let regExp = /^[1-9]\d*$/;
            if (!regExp.test(newVal)) {
                this.couponSeveral = 1;
            }
        },
        startDate: function (newVal) {
            this.startDateFlag = false;
            if (newVal != null) {
                let now = new Date();
                let nowDate = now.getDate();
                let time = Date.parse(newVal);
                let date = new Date(time);
                let theDate = date.getDate();
                if (theDate < nowDate) {
                    this.startDate = null;
                } else {
                    this.startDateFlag = true;
                }
            }
        },
        endDate: function (newVal) {
            this.endDateFlag = false;
            if (newVal != null) {
                if (this.startDate != null) {
                    if (Date.parse(newVal) < Date.parse(this.startDate)) {
                        this.endDate = null;
                    } else {
                        this.endDateFlag = true;
                    }
                } else {
                    this.endDate = null;
                }
            }
        },
        couponCondition: function (newVal) {
            this.couponConditionFlag = false;
            if (newVal != null) {
                let regExp = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
                if (!regExp.test(newVal)) {
                    this.couponCondition = null;
                } else {
                    this.couponConditionFlag = true;
                }
            }

        },
        couponContent1: function (newVal) {
            this.couponContent1Flag = false;
            if (newVal != null) {
                let regExp = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
                if (!regExp.test(newVal)) {
                    this.couponContent1 = null;
                } else {
                    this.couponContent1Flag = true;
                }
            }

        }
    }
});