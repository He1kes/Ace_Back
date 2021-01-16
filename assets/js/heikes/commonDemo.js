var app = new Vue({
    el:"#app",
    data:{
        option:"后缀",
        allCheck:false,
        nagiList:[],
        pages:'',
        total:'',
        commentList:[],
        userName:[],
        houseName:[],
        pageNum:1,
        pageSize:5
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
        //上一页下一页
        pageActive:function(item){
            this.pageNum = item;
            axios.get(commentIp+"/back/allComment?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&houseName="+this.houseName).then(function (value) {
                app.commentList = value.data.data.list;
                app.nagiList = value.data.data.navigatepageNums;
                app.pages = value.data.data.pages;
                app.total = value.data.data.total;
            })
        },
        //查询所有评论
        allComment:function () {
            axios.get(commentIp+"/back/allComment?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&userName="+this.userName+"&houseName="+this.houseName).then(function (value) {
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