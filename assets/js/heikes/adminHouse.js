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
        this.allHouse()
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
            axios.get(houseIp+"/back/BackAdminCheck?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&address="+this.address).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //查询待审核房源
        allHouse:function () {
            axios.get(houseIp+"/back/BackAdminCheck?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&address="+this.address).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //通过审核
        passHouse:function (id) {
            console.log(id)
            axios.get(houseIp+"/back/HouseCheckPass?id="+id).then(function (value) {
                if (value.data.flag){
                    alert("通过审核")
                    window.location.reload();
                }else {
                    alert("审核失败")
                }
            })
        }
    }
})