//初始时间
var initialDate = new Date();

//设置下拉框的年份（最近三年）
var years = new Array();
function getRecentYear(year) {
    for(var i=year;i>=year-2;i--){
        var $opt = $('<option value="'+i+'">'+i+'</option>');
        $(".year").append($opt);
        years[i-1] = i;
    }
    console.log(years);
}
getRecentYear(initialDate.getFullYear());

//设置下拉框的月份、x轴月份数组（本年显示已过月份，往年显示所有月份）
var months = new Array();
function getNowMonth(year) {
    $("#businessesEchartsDiv01 .month").empty();
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    if(nowYear == year){
        var nowMonth = nowDate.getMonth()+1;
        for(var i=1;i<=nowMonth;i++){
            var $opt = $('<option value="'+i+'">'+i+'</option>');
            $("#businessesEchartsDiv01 .month").append($opt);
            months[i-1] = i;
        }
    }else {
        for(var i=1;i<=12;i++){
            var $opt = $('<option value="'+i+'">'+i+'</option>');
            $("#businessesEchartsDiv01 .month").append($opt);
            months[i-1] = i;
        }
    }
    console.log(months+" "+year);
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
        for(var i=1;i<nowDay;i++){
            days[i-1] = i;
        }
    }else {
        var nowDay = new Date(year,month,0).getDate();
        for(var i=1;i<=nowDay;i++){
            days[i-1] = i;
        }
    }
    console.log(days+" "+year+"-"+month);
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
    getDays(year,month);
    drawEcharts();
})



function drawEcharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart01 = echarts.init(document.getElementById('businessesEcharts01'));
    var myChart02 = echarts.init(document.getElementById('businessesEcharts02'));

// 指定图表的配置项和数据
    var option01 = {
        title: {
            text: '房租日收入折线图'
        },
        legend:{
            data:["房租日收入额"],
            right:'10%'
        },
        tooltip: {},
        xAxis: {
            name:'（日）',
            data: days
        },
        yAxis: {
            name:'（元）'
        },
        series: [{
            name: '房租日收入额',
            type: 'line',
            label:{
                show:true,
                position:'top'
            },
            data: days
        }]
    };

    var option02 = {
        title: {
            text: '上年度房租月收入占比',
            left: 'center'
        },
        tooltip: {},
        series: [
            {
                name: '当月收入',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: 535, name: '1月'},
                    {value: 203, name: '2月'},
                    {value: 365, name: '3月'},
                    {value: 103, name: '4月'},
                    {value: 104, name: '5月'},
                    {value: 203, name: '6月'},
                    {value: 342, name: '7月'},
                    {value: 345, name: '8月'},
                    {value: 459, name: '9月'},
                    {value: 343, name: '10月'},
                    {value: 866, name: '11月'},
                    {value: 566, name: '12月'}
                ],
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
    myChart01.setOption(option01);
    myChart02.setOption(option02);
}
drawEcharts();
