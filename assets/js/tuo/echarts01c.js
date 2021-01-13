//初始时间
var initialDate = new Date();
//地址
var txq = txqIp;
var orderPath = "/order/back";
var orderIP="/order/front/private/";
//token
var token = localStorage.getItem("token");
//用户id
var userId;
//图表1参数
var dataYear1 = null;
var dataMonth1 = null;
var dataday1 = null;

//图表y轴数据
var chartOneDataY;
var chartTwoDataY;


//设置下拉框的年份（最近三年）
function getRecentYear(year) {
    for(var i=year;i>=year-2;i--){
        var $opt = $('<option value="'+i+'">'+i+'</option>');
        $(".year").append($opt);
    }
}
getRecentYear(initialDate.getFullYear());

//设置下拉框的月份（本年显示已过月份，往年显示所有月份）
function getNowMonth(year) {
    $("#businessesEchartsDiv01 .month").empty();
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    if(nowYear == year){
        var nowMonth = nowDate.getMonth()+1;
        for(var i=1;i<=nowMonth;i++){
            var $opt = $('<option value="'+i+'">'+i+'</option>');
            $("#businessesEchartsDiv01 .month").append($opt);
        }
    }else {
        for(var i=1;i<=12;i++){
            var $opt = $('<option value="'+i+'">'+i+'</option>');
            $("#businessesEchartsDiv01 .month").append($opt);
        }
    }
}
getNowMonth(initialDate.getFullYear());

//设置x轴日数组（本月当天不显示，往月显示每一天）
var days = new Array();
function getDays(year,month) {
    days = [];
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth()+1;
    if(nowYear == year && nowMonth == month){
        var nowDay = nowDate.getDate();
        dataday1 = nowDay;
        for(var i=1;i<nowDay;i++){
            days[i-1] = i;
        }
    }else {
        var nowDay = new Date(year,month,0).getDate();
        dataday1 = nowDay;
        for(var i=1;i<=nowDay;i++){
            days[i-1] = i;
        }
    }
}
getDays(initialDate.getFullYear(),initialDate.getMonth()+1);

//年、月下拉框联动(年确定月）
$("#businessesEchartsDiv01 .year").blur(function () {
    var year = $("#businessesEchartsDiv01").find(".year option:selected").val();
    getNowMonth(year);
})

//获取年、月下拉框选定的值
$("#selectYearMonth").click(function () {
    var year = $("#businessesEchartsDiv01").find(".year option:selected").val();
    var month = $("#businessesEchartsDiv01").find(".month option:selected").val();
    dataYear1 = year;
    dataMonth1 = month;
    getDays(year,month);
    getChartOneData(dataYear1,dataMonth1,dataday1,userId);
})

//设置x轴月份数组(月入收益图表）
var months = new Array();
months = [1,2,3,4,5,6,7,8,9,10,11,12];

//设置饼状图的数据
var yuesdate = new Array();
function setData() {
    for(var i=1;i<=12;i++){
        var datay = {};
        datay.name = months[i-1]+"月";
        datay.value = chartTwoDataY[i-1];
        yuesdate.push(datay);
    }
    console.log(yuesdate);
}


//通过token拿userId
function getUidByToken() {
    $.ajax({
        url:txq+orderIP+"/getUserIdByToken",
        headers:{"token":localStorage.getItem("token")},
        async:false,
        success:function (data) {
            userId = data.data;
            console.log("getUserIdByToken:");
            console.log(userId);
        }
    })
}
getUidByToken();

//获取第一个图表的数据
function getChartOneData(year,month,day,lid) {
    $.ajax({
        url:txq+orderPath+"/getOrderMoneyDay",
        data:{year:year,month:month,day:day,landId:lid},
        headers:{"token":localStorage.getItem("token")},
        async:false,
        success:function (data) {
            chartOneDataY = data;
            console.log("getChartOneData:");
            console.log(data);
            drawEchartOne();
        }
    })
}

//获取第二个图表的数据
function getChartTwoData(year,month,lid) {
    $.ajax({
        url:txq+orderPath+"/getOrderMoneyMonth",
        data:{year:year,month:month,landId:lid},
        headers:{"token":localStorage.getItem("token")},
        async:false,
        success:function (data) {
            chartTwoDataY = data;
            setData();
            console.log("getChartTwoData:");
            console.log(data);
            drawEchartTwo();
        }
    })
}

function drawEchartOne() {
    // 基于准备好的dom，初始化echarts实例
    var myChart01 = echarts.init(document.getElementById('businessesEcharts01'));

// 指定图表的配置项和数据
    var option01 = {
        title: {
            text: '房租日收入额'
        },
        legend:{
            data:["日收入额"],
            right:'10%'
        },
        tooltip: {

        },
        xAxis: {
            name:'（日）',
            data: days
        },
        yAxis: {
            name:'（元）'
        },
        series: [{
            name: '日收入额',
            type: 'line',
            label:{
                show:true
            },
            data: chartOneDataY
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart01.setOption(option01);
}


function drawEchartTwo() {
    // 基于准备好的dom，初始化echarts实例
    var myChart02 = echarts.init(document.getElementById('businessesEcharts02'));

// 指定图表的配置项和数据
    var option02 = {
        title: {
            text: '上年度租房月收入占比',
            left: 'center'
        },
        tooltip: {},
        series: [
            {
                name: '当月收入',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: yuesdate,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    show:true,
                    formatter: '{b} ({d}%)'
                },
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart02.setOption(option02);
}

//初始图表
getChartOneData(initialDate.getFullYear(),initialDate.getMonth()+1,initialDate.getDate(),userId);
getChartTwoData(initialDate.getFullYear()-1,12,userId);