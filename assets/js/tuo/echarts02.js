
// 基于准备好的dom，初始化echarts实例
var myChart01 = echarts.init(document.getElementById('businessesEcharts01'));
var myChart02 = echarts.init(document.getElementById('businessesEcharts02'));

// 指定图表的配置项和数据
var option01 = {
    title: {
        text: '月度收入流水'
    },
    tooltip: {},
    xAxis: {
        data: ["1","2","3","4","5","6","7","8","9","10","11","12"]
    },
    yAxis: {},
    series: [{
        name: '月度收入',
        type: 'line',
        data: [535010,203020,365030,103040,104050,203060,342070,345080,459090,343100,86610,566120]
    }]
};

var option02 = {
    title: {
        text: '每月热租地区',
        left: 'center'
    },
    tooltip: {

    },
    series: [
        {
            name: '每月热租地区占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {value: 164780, name: '北京'},
                {value: 156730, name: '上海'},
                {value: 148904, name: '广东'},
                {value: 30039, name: '湖北'},
                {value: 20067, name: '浙江'}
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
