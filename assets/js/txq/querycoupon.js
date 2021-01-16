const userTable = new Vue({
    el: '#couponTable',
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
            couponCondition: null,
            couponContent: null,
            couponType: -1
        }
    },

    mounted: function () {
        this.getCouponList(1);
    },

    methods: {
        changeCouponType(event) {
            this.form.couponType = event.target.value;
        },
        getCouponList(pageNum) {
            let that = this;
            let formData = new FormData();
            formData.append('pageNum', pageNum);
            formData.append('pageSize', 2);
            formData.append('couponCondition',this.form.couponCondition == null ? '' : this.form.couponCondition);
            formData.append('couponContent', this.form.couponContent == null ? '' : this.form.couponContent);
            formData.append('couponType', this.form.couponType);
            axios({
                method: 'post',
                url: txqIp + '/coupon/back/getCouponList',
                data: formData,
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    that.page = result.data.data;
                    if (result.data.data.list != null && result.data.data.list.length > 0) {
                        that.selectFlag = true;
                    } else {
                        that.selectFlag = false;
                    }
                });
        },
        prevPage() {
            if (this.page.pageNum > 1) {
                let pageNum = this.page.pageNum - 1 >= 1 ? this.page.pageNum - 1 : 1;
                this.getCouponList(pageNum);
            }
        },
        nextPage() {
            if (this.page.pageNum < this.page.pages) {
                let pageNum = this.page.pageNum + 1 <= this.page.pages ? this.page.pageNum + 1 : this.page.pages;
                this.getCouponList(pageNum);
            }
        }
    }
});