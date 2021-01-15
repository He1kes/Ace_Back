var app = new Vue({
    el:"#app",
    data:{
        option:"后缀",
        allCheck:false,
        nagiList:[],
        pages:'',
        total:'',
        houseInfo:[],
        userName:[],
        address:[],
        pageNum:1,
        pageSize:5,
    },
    mounted:function(){
        this.passHouse()
    },
    methods:{
        //复选框全选
        allCheckBox:function () {
            //选中为true,未选中为false
            //console.log(event.target.checked);
            this.allCheck = event.target.checked;
        },
        //上一页下一页
        pageActive:function(item){
            this.pageNum = item;
            axios.get(houseIp+"/back/BackAdminAll?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&address="+this.address).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //查询审核通过的房源
        passHouse:function () {
            axios.get(houseIp+"/back/BackAdminAll?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&address="+this.address).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //下架出租房源
        stopRent:function (id) {
            axios.get(houseIp+"/back/HouseCheckStop?id="+id).then(function (value) {
                if (value.data.flag){
                    alert("下架成功")
                    window.location.reload();
                }else {
                    alert("下架失败")
                }
            })
        }
    }
})