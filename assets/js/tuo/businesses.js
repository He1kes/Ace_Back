var app = new Vue({
    el:"#kshContent",
    data:{
        option:"后缀",
        //网关地址
        tIP:txqIp,
        orderIP:"/order/back",
        orderPath:"/order/front/private/",
        //当前用户token
        nowToken:localStorage.getItem("token"),
        //数据
        orderCounts:0,
        orderMoney:0,
        //当前用户id
        userId:"1"
    },
    mounted:function(){
        this.getUidByToken();
    },
    methods:{
        //通过token拿userId
        getUidByToken: function(){
            var that = this;
            console.log(that.nowToken);
            axios.get(that.tIP+that.orderPath+"getUserIdByToken", {headers: {'token': that.nowToken}}).then(
                function (value) {
                    //console.log(value.data.flag);
                    console.log("getUidByToken:"+value.data.data);
                    if(value.data.flag == true){
                        that.userId = value.data.data;
                        that.getOrderCounts(that.userId);
                        that.getOrderMoney(that.userId);
                    }else {
                        console.log(value.data.message);
                    }
                }
            )
        },
        //统计订单金额
        getOrderMoney:function (lid) {
            var that = this;
            axios.get(that.tIP+that.orderIP+"/getOrderMoney?landId="+lid, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    console.log(value.data);
                    that.orderMoney = value.data;
                }
            )
        },
        //统计订单总单数
        getOrderCounts:function (lid) {
            var that = this;
            axios.get(that.tIP+that.orderIP+"/getOrderCounts?landId="+lid, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    console.log(value.data);
                    that.orderCounts = value.data;
                }
            )
        },
    }
})