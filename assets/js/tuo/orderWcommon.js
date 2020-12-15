var app = new Vue({
    el:"#orderTable01",
    data:{
        option:"后缀",
        allCheck:false,
        pageActiveNum:1,
        nagiList:[1,2,3,4,5],
        menuActiveNum:1
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
        }
    }
})