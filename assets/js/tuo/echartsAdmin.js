//初始时间
var initialDate = new Date();
//地址
var txq = txqIp;
var orderPath = "/order/back";
//token
var token = localStorage.getItem("token");

//图表y轴数据
var chartOneDataY;
var chartTwoDataY;


//设置x轴日数组（本月当天不显示，往月显示每一天）
var days = new Array();
function getDays(year,month) {
    days = [];
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth()+1;
    if(nowYear == year && nowMonth == month){
        var nowDay = nowDate.getDate();
        for(var i=1;i<nowDay;i++){
            days[i-1] = i;
        }
    }else {
        var nowDay = new Date(year,month,0).getDate();
        for(var i=1;i<=nowDay;i++){
            days[i-1] = i;
        }
    }
}
getDays(initialDate.getFullYear(),initialDate.getMonth()+1);

//设置x轴月份数组(月入收益图表）
var months = new Array();
function getMonths(year) {
    months = [];
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    if(nowYear == year){
        var nowMonth = nowDate.getMonth()+1;
        for(var i=1;i<=nowMonth;i++){
            months[i-1] = i;
        }
    }else {
        for(var i=1;i<=12;i++){
            months[i-1] = i;
        }
    }
}
getMonths(initialDate.getFullYear());

//获取第一个图表的数据
function getChartOneData(year,month,day) {
    $.ajax({
        url:txq+orderPath+"/getOrderMoneyDay",
        data:{year:year,month:month,day:day},
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
function getChartTwoData(year,month) {
    $.ajax({
        url:txq+orderPath+"/getOrderMoneyMonth",
        data:{year:year,month:month},
        headers:{"token":localStorage.getItem("token")},
        async:false,
        success:function (data) {
            chartTwoDataY = data;
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
            text: '平台本月日入流水'
        },
        legend:{
            data:["日入流水"],
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
            name: '日入流水',
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
            text: '平台本年月入流水'
        },
        legend:{
            data:["月入流水"],
            right:'10%'
        },
        tooltip: {

        },
        xAxis: {
            name:'（月份）',
            data: months
        },
        yAxis: {
            name:'（元）'
        },
        series: [{
            name: '月入流水',
            type: 'bar',
            label:{
                show:true
            },
            data: chartTwoDataY
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart02.setOption(option02);
}

//初始图表
getChartOneData(initialDate.getFullYear(),initialDate.getMonth()+1,initialDate.getDate());
getChartTwoData(initialDate.getFullYear(),initialDate.getMonth()+1);