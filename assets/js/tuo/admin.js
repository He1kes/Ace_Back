var app = new Vue({
    el:"#kshContent",
    data:{
        option:"后缀",
        //网关地址
        tIP:txqIp,
        orderIP:"/order/back",
        //当前用户token
        nowToken:localStorage.getItem("token"),
        //数据
        orderCounts:0,
        orderMoney:0
    },
    mounted:function(){
        this.getOrderMoney();
        this.getOrderCounts();
    },
    methods:{
        //统计订单金额
        getOrderMoney:function () {
            var that = this;
            axios.get(that.tIP+that.orderIP+"/getOrderMoney", {headers: {'token': that.nowToken}}).then(
                function (value) {
                    console.log(value.data);
                    that.orderMoney = value.data;
                }
            )
        },
        //统计订单总单数
        getOrderCounts:function () {
            var that = this;
            axios.get(that.tIP+that.orderIP+"/getOrderCounts", {headers: {'token': that.nowToken}}).then(
                function (value) {
                    console.log(value.data);
                    that.orderCounts = value.data;
                }
            )
        },
    }
})