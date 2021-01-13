const  changepermission = new Vue({
    el: '#changepermission',
    data: {
        page: {
            pageNum: 1,
            pageSize: 5,
            pages: 1,
            navigatepageNums: new Array(),
            total: 0,
            list: null
        }
    },
    methods: {
        getRoleByPage(pageNum) {
            let that = this;
            let formData = new FormData();
            formData.append('pageNum', pageNum);
            formData.append('pageSize', 2);
            axios({
                method: 'post',
                url: txqIp + '/user/role/back/getRoleByPage',
                data: formData,
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(function (result) {
                    that.page = result.data.data;
                });
        },
        prevPage() {
            if (this.page.pageNum > 1) {
                let pageNum = this.page.pageNum - 1 >= 1 ? this.page.pageNum - 1 : 1;
                this.getRoleByPage(pageNum);
            }
        },
        nextPage() {
            if (this.page.pageNum < this.page.pages) {
                let pageNum = this.page.pageNum + 1 <= this.page.pages ? this.page.pageNum + 1 : this.page.pages;
                this.getRoleByPage(pageNum);
            }
        },
    },
    mounted: function () {
        this.getRoleByPage(1);
    }
});