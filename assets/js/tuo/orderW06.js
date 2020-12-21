var app = new Vue({
    el:"#Content",
    data:{
        option:"后缀",
        allCheck:false,
        pageActiveNum:1,
        nagiList:[1,2,3,4,5],
        detailFlag:false,
        csCodeError:false,
        idCardError:false,
        consumCode:"",
        identityCard:""
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
        //关闭订单详情
        detailClose:function () {
            this.detailFlag = false;
        },
        //检查消费码（格式以及数据库进行比对）
        checkConsumCode:function () {
            var regx = /^\d{8}$/;
            if(!regx.test(this.consumCode)){
                this.csCodeError = true;
                alert("消费码有误！");
            }else {
                this.csCodeError = false;
            }

        },
        //检查身份证格式
        checkIdentityCard:function () {
            var regx = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            if(!regx.test(this.identityCard)){
                this.idCardError = true;
                alert("身份证号码有误！");
            }else {
                this.idCardError = false;
            }
        },
        //检查入住信息完整性
        checkIn:function () {
            if(this.consumCode == "" || this.identityCard == ""){
                alert("数据未填写完整！");
            }else if(this.csCodeError || this.idCardError){
                alert("请检查数据是否填写正确！");
            }else{
                //调用函数...
                //关闭详情页
                this.consumCode = "";
                this.identityCard = "";
                this.detailFlag = false;
            }
        }
    }
})