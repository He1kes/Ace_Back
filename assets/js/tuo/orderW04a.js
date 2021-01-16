var app = new Vue({
    el:"#orderTable01",
    data:{
        option:"后缀",
        detailFlag:false,
        allCheck:false,
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
        userId:"",
        nowUser:{},
        pickUserId:"",
        pickUser:{},
        //分页
        pageNo:1,
        pageSize:5,
        pages:1,
        dateTotal:0,
        navigatePageNums:[],
        //数组
        ordersList:[],
        userList:[],
        houseIdList:[],
        houseInfoList:[],
        houseTypeList:[],
        landList:[],
        //选中的订单index
        pickIndex:0,
        //查询条件
        rejectStatus:"已取消（已退款）"
    },
    mounted:function(){
        this.allHouseType();
        this.getOrders(1);
    },
    methods:{
        //复选框全选
        allCheckBox:function () {
            //选中为true,未选中为false
            //console.log(event.target.checked);
            this.allCheck = event.target.checked;
        },
        //展示订单详情
        detailShow:function () {
            this.detailFlag = true;
        },
        //关闭订单详情
        detailClose:function () {
            this.detailFlag = false;
        },
        //--------------------------------------
        //获取租客信息
        getUserData:function (userId) {
            var that = this;
            axios.get(that.tIP+"/user/front/private/getUserData?userId="+userId, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    //console.log("getUserData:");
                    //console.log(value.data.data[0]);
                    that.nowUser = value.data.data[0];
                }
            )
        },
        //获取房东信息
        getUserDataLand:function (userId) {
            var that = this;
            axios.get(that.tIP+"/user/front/private/getUserData?userId="+userId, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    //console.log("getUserData:");
                    //console.log(value.data.data[0]);
                    that.pickUser = value.data.data[0];
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
            axios.get(that.tIP+that.orderBack+"getOrdersBack?pageNo="+pageNo+"&pageSize="+that.pageSize+"&orderStatus=退款中", {headers: {'token': that.nowToken}}).then(
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
                    that.landList = value.data.landIds;
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

        },
        //选中的订单
        pickOrder:function (index) {
            var that = this;
            that.pickIndex = index;
            that.userId = that.userList[index];
            that.getUserData(that.userId);
            that.pickUser = that.landList[index];
            that.getUserDataLand(that.pickUser);
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
        //确认退款----------
        refund:function (orderId) {
            var that = this;
            axios.get(that.tIP+that.orderIP+"updateOrderStatus?orderId="+orderId+"&orderStatus="+that.rejectStatus, {headers: {'token': that.nowToken}}).then(
                function (value) {
                    if(value.data.flag == true){
                        console.log("退款成功！");
                        that.getOrders(that.pageNo);
                    }else {
                        console.log(value.data.message);
                    }
                }
            )
        }
    }
})