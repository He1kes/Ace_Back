
// 基于准备好的dom，初始化echarts实例
var myChart01 = echarts.init(document.getElementById('businessesEcharts01'));
var myChart02 = echarts.init(document.getElementById('businessesEcharts02'));

// 指定图表的配置项和数据
var option01 = {
    title: {
        text: '月度收入折线图'
    },
    tooltip: {},
    xAxis: {
        data: ["1","2","3","4","5","6","7","8","9","10","11","12"]
    },
    yAxis: {},
    series: [{
        name: '房租收益额',
        type: 'line',
        data: [535,203,365,103,104,203,342,345,459,343,866,566]
    }]
};

var option02 = {
    title: {
        text: '年度每月收入占比',
        left: 'center'
    },
    tooltip: {

    },
    series: [
        {
            name: '每月收入占比',
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
