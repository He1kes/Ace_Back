var app = new Vue({
    el:"#orderTable05",
    data:{
        option:"后缀",
        allCheck:false,
        pageActiveNum:1,
        nagiList:[1,2,3,4,5],
        detailFlag:false,
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
        //展示订单详情
        detailShow:function () {
            this.detailFlag = true;
        },
        //关闭订单详情（拒绝原因）
        detailClose:function () {
            this.detailFlag = false;
        }
    }
})