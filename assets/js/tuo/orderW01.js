var app = new Vue({
    el:"#orderTable01",
    data:{
        option:"后缀",
        detailFlag:false,
        //--------
        tipFlag:false,
        //网关地址
        tIP:txqIp,
        orderIP:"/order/front/private/",
        ohouseIP:"/ohouse/front/public/",
        orderBack:"/order/back/",
        //当前用户token
        nowToken:localStorage.getItem("token"),
        //当前用户id
        userId:"1",
        nowUser:{},
        pickUserId:"",
        pickUser:{},
        //分页
        pageNo:1,
        pageSize:2,
        pages:1,
        dateTotal:0,
        navigatePageNums:[],
        //数组
        ordersList:[],
        userList:[],
        houseIdList:[],
        houseInfoList:[],
        houseTypeList:[],
        //选中的订单index
        pickIndex:0,
        //查询条件
        queryTJ:""
    },
    mounted:function(){
        this.getUidByToken();
        this.allHouseType();
    },
    methods:{
        //展示订单详情
        detailShow:function () {
            this.detailFlag = true;
        },
        //关闭订单详情
        detailClose:function () {
            this.detailFlag = false;
        },
        //--------------------------------------
        //通过token拿userId
        getUidByToken: function(){
            var that = this;
            console.log(that.nowToken);
            axios.get(that.tIP+that.orderIP+"getUserIdByToken", {headers: {'token': that.nowToken}}).then(
                function (value) {
                    //console.log(value.data.flag);
                    console.log("getUidByToken:"+value.data.data);
                    if(value.data.flag == true){
                        that.userId = value.data.data;
                        that.getOrders(1);
                    }else {
                        console.log(value.data.message);
                    }
                    that.getUserData(that.userId);
                }
            )
        },
        //获取用户信息
        getUserData:function (userId) {
            var that = this;
            axios.get(that.tIP+"/user/front/private/getUserData?userId="+userId, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    //console.log("getUserData:");
                    //console.log(value.data.data[0]);
                    if(userId != that.userId){
                        that.pickUser = value.data.data[0];
                        //that.pickUserId = value.data.data[1];
                    }else {
                        that.nowUser = value.data.data[0];
                        //that.userId = value.data.data[1];
                    }
                }
            )
        },
        //获取当前用户的订单
        getOrders:function (pageNo) {
            var that = this;
            //因为订单详情也在这个页面，进来就会加载，所以先给个0保证有值，不会加载页面出错
            that.pickIndex = 0;
            if(pageNo == null){
                pageNo = that.pageNo;
            }
            if(pageNo < 1){
                pageNo = that.pageNo;
            }
            if(pageNo > that.pages){
                pageNo = that.pages;
            }
            if(that.queryTJ.length <= 0){
                axios.get(that.tIP+that.orderBack+"getOrdersBack?pageNo="+pageNo+"&pageSize="+that.pageSize+"&landId="+that.userId, {headers: {'token': that.nowToken}}).then(
                    function (value) {
                        that.pageNo = pageNo;
                        that.navigatePageNums = value.data.orders.navigatepageNums;
                        that.pages = value.data.orders.pages;
                        that.dateTotal = value.data.orders.total;
                        //数据
                        //console.log(value.data.houseIds);
                        that.ordersList = value.data.orders.list;
                        that.userList = value.data.userIds;
                        that.houseIdList = value.data.houseIds;
                        if (that.ordersList.length <= 0) {
                            that.tipFlag = true;
                        }else {
                            that.houseInfoList = [];
                            for(var i=0;i<that.houseIdList.length;i++){
                                that.getHouseInfo(that.houseIdList[i]);
                            }
                            that.tipFlag = false;
                        }
                    }
                )
            }else {
                axios.get(that.tIP+that.orderBack+"getOrdersBack?pageNo="+pageNo+"&pageSize="+that.pageSize+"&landId="+that.userId+"&orderStatus="+that.queryTJ, {headers: {'token': that.nowToken}}).then(
                    function (value) {
                        that.pageNo = pageNo;
                        that.navigatePageNums = value.data.orders.navigatepageNums;
                        that.pages = value.data.orders.pages;
                        that.dateTotal = value.data.orders.total;
                        //数据
                        //console.log(value.data.houseIds);
                        that.ordersList = value.data.orders.list;
                        that.userList = value.data.userIds;
                        that.houseIdList = value.data.houseIds;
                        if (that.ordersList.length <= 0) {
                            that.tipFlag = true;
                        }else {
                            that.houseInfoList = [];
                            for(var i=0;i<that.houseIdList.length;i++){
                                that.getHouseInfo(that.houseIdList[i]);
                            }
                            that.tipFlag = false;
                        }
                    }
                )
            }

        },
        //选中的订单
        pickOrder:function (index) {
            var that = this;
            that.pickIndex = index;
            that.pickUserId = that.userList[index];
            that.getUserData(that.pickUserId);
            that.checkDate();
        },
        //根据houseId获取房源信息
        getHouseInfo:function (houseId) {
            var that = this;
            axios.get(that.tIP+that.ohouseIP+"getHouseInfo?id="+houseId).then(
                function (value) {
                    if(value.data.flag == true){
                        that.houseInfoList.push(value.data.data);
                    }else {
                        console.log(value.data.message);
                    }
                    //console.log(that.houseInfoList);
                }
            )
        },
        //获取全部房屋类型
        allHouseType:function () {
            var that = this;
            axios.get(that.tIP+that.ohouseIP+"allHouseType").then(
                function (value) {
                    if(value.data.flag == true){
                        that.houseTypeList = value.data.data;
                        console.log(value.data.data);
                    }else {
                        console.log(value.data.message);
                    }
                }
            )
        },
        queryOrders:function () {

        }
    }
})