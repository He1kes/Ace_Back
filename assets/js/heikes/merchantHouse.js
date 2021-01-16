var app = new Vue({
    el:"#app",
    data:{
        option:"后缀",
        allCheck:false,
        nagiList:[],
        pages:'',
        total:'',
        houseInfo:[],
        address:[],
        checkStatus:'',
        pageNum:1,
        pageSize:5,
        id: localStorage.getItem("useId")
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
            axios.get(houseIp+"/back/BackBussAll?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&address="+this.address+"&checkStatus="+this.checkStatus+"&id="+this.id).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //商家查询自己的房源
        allHouse:function () {
            axios.get(houseIp+"/back/BackBussAll?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&address="+this.address+"&checkStatus="+this.checkStatus+"&id="+this.id).then(function (value) {
                app.houseInfo = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //修改房源信息
        updateInfo:function (id) {
            console.log(id);
            location.href="housing_detail.html?id="+id;
        },
        //下架房源
        stopPass:function (id) {
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