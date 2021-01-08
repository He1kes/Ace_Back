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
        commentList:[],
        userName:[],
        houseName:[]
    },
    mounted:function(){
        this.allComment()
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
        //查询所有评论
        allComment:function () {
            axios.get(commentIp+"/back/allComment?pageNum=1&pageSize=5").then(function (value) {
                app.commentList = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //删除评论
        deleteComment:function (id) {
            axios.get(commentIp+"/back/deleteComment?id="+id);
        },
        //条件查询
        searchComment:function () {
            axios.get(commentIp+"/back/allComment?pageNum=1&pageSize=5&userName="+app.userName+"&houseName="+app.houseName).then(function (value) {
                app.commentList = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        }
    }
})