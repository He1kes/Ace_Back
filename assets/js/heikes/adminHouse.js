var app = new Vue({
    el:"#app",
    data:{
        option:"后缀",
        allCheck:false,
        pageActiveNum:1,
        nagiList:[],
        menuActiveNum:'',
        pages:'',
        total:'',
        houseInfo:[],
        userName:[],
        houseName:[]
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
        //当前选中的页数
        pageActive:function(item){
            this.pageActiveNum = item;
        },
        //当前选中菜单
        menuActive:function (item) {
            this.menuActiveNum = item;
            console.log(this.menuActiveNum);
        },
        //查询待审核房源
        allHouse:function () {
            axios.get(houseIp+"/back/BackAdminCheck")
        }
    }
})