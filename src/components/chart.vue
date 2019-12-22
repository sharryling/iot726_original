<template>
<div id="chart" ref="chart"></div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import $ from "jquery";
import data from '.././util/mock2';
const init_data = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
var N = 10 //横坐标个数
var n = 0
var data_get_addr = "http://111.231.244.208:8081/temperature" //
//var data_get_addr = "http://g2.cn" //'http://qhl.free.idcfengye.com/temp_hum'
export default {
    name: 'charts',
    props: {
        /* imei:{
            type: String
        }, */ 
        
        /* 'token', */ 
        once:{
            type: Boolean
        }, 
    },
    data() {
        return {
            chart_appv: {},
            data_temperature: [],
            data_humidity: [],
            data_time: [],
            channel: [],
        };
    },

    watch: {
        'chart_appv': {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (oldValue === undefined) return
                this.getChartData();

            }
        },
        'once': {
            handler(newValue, oldValue) {
                if (newValue == false){
                    console.log("selec=", newValue, oldValue)
                    clearInterval(this.t)
                    }
                    /* clearInterval(this.t) */
                /* this.init_Data(); */
                /* this.getAlldata();
                this.initChart();
                this.getChartData();
                window.addEventListener("resize", () => {
                    this.resize(); //监听屏幕大小，来刷新画布
                }); */

            }
        },
        
    },
    created() {
 /*    this.t = window.setInterval(this.getAlldata, 3000); */
    },
    mounted() {
        console.log("aaaa=", this.once)
        this.init_Data();
        this.getAlldata();
        this.initChart();
        this.getChartData();
        window.addEventListener("resize", () => {
            this.resize(); //监听屏幕大小，来刷新画布
        });
        if(this.once){
            this.$nextTick(() => {
            this.t=setInterval(this.getAlldata, 3000);
            
        
        });
        }
        
       /*  this.$nextTick(() => {
            setInterval(this.getAlldata, 3000);
        }); */
    },
   

    methods: {
        init_Data() {
            n=0
            this.data_temperature = init_data.slice(0)
            this.data_humidity = init_data.slice(0)
            this.data_time = init_data.slice(0)
            this.channel = init_data.slice(0)
        },
        //查询图表数据  动态的改变数据
        getAlldata() {
            //console.log("sessslec=",this.com_select)
            var that = this;
            $.get(
                data_get_addr+ '?imei=' + this.imei ,// +,'?token=' + this.token
                function (result) {
                    //result = JSON.parse(result) //for test mock
                    that.chart_appv = result.res
                    //方式一，从后面push开始
                    /*                     that.data_temperature.push(result.res[0].temp_value)
                                        that.data_time.push(time_form(result.res[0].timeStamp))
                                        that.channel.push(result.res[0].channel)

                                        that.data_temperature.shift();
                                        that.data_time.shift();
                                        that.channel.shift(); */
                    //方式一，从第一个开始，替代
                    //
                    if (n === N - 1) {
                        that.init_Data()
                        n = 0
                        //console.log("restart!")
                    }
                    that.data_temperature[n] = result.res[0].temp_value
                    that.data_time[n] = time_form(result.res[0].timeStamp)
                    that.channel[n] = result.res[0].channel
                    //                    
                    n = n + 1;
                
                    /* console.log("data_temperature",that.data_temperature)
                    console.log("data_time",that.data_time) */
                    console.log("n",n)
                }
            );
        },

        getChartData() {
            this.chart.setOption({
                xAxis: [{
                        data: this.data_time,
                    },
                    {
                        data: this.channel
                    },
                ],
                series: [{
                    data: this.data_temperature
                }, ],
            });
            this.chart.hideLoading();
        },
        //初始化图表
        initChart() {
            let option = {
                title: {
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#fff' // 主标题文字颜色
                    },
                    text: '温湿度实时曲线变化'
                },
                tooltip: {
                    trigger: "axis", //鼠标悬浮交互时的信息提示
                    formatter: "时间 : {b0}<br />温度：{c}°<br /> ",
                    axisPointer: {
                        type: "line" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['通道', '温度', '湿度'],
                    textStyle: { //图例文字的样式
                        color: '#fff',
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    //top: "3%",
                    x: "3%",
                    x2: "3%",
                    containLabel: true
                },
                xAxis: [{
                        type: "category",
                        boundaryGap: false,
                        data: [],
                        axisLabel: { //坐标轴文本标签
                            formatter: function (value, index) {
                                var splittime = value.trim().split(" ")
                                return splittime[1]
                            },
                        },
                        name: "时间",
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },

                        nameGap: 5
                    },
                    {
                        boundaryGap: false,
                        type: 'category',
                        axisPointer: {
                            /* label: {
                                 formatter: function (params) {
                                    console.log("para:",params)
                                    return '降水量  ' + params.value //+
                                       // (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                } 
                            } */
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        data: [

                        ],
                        name: "通道",
                        nameGap: 5,
                    }
                ],
                yAxis: {
                    type: "value",
                    /* axisLabel: {
                        formatter: "{value}"
                    }, */
                    max: function (value) {
                        return value.max + 0.5;
                    },
                    min: function (value) {
                        return value.min - 0.5;
                    },
                    name: "温度",
                    nameGap: 23,
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C'
                    },
                    splitLine: {
                        show: false
                    },
                },
                toolbox: {
                    x: '90%',
                    y: 'top',
                    show: true,
                    feature: {
                        /* magicType: {
                            type: ['line', 'bar']
                        }, */
                        /* restore: {}, */
                        saveAsImage: {},
                        //dataZoom:{}
                    },
                    iconStyle: {
                        normal: {
                            color: '#fff', //设置颜色
                        }
                    }
                },
                series: [{
                        name: "温度",
                        type: "line",
                        symbol: "circle",
                        symbolSize: [8, 8],
                        itemStyle: {
                            color: "#43B9E1"
                        },
                        lineStyle: {
                            color: "#f9f1cb"
                        },
                        data: [],
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: '最大值',
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ],

                        },

                    },

                ]
            };
            var that = this;
            that.chart = echarts.init(that.$refs.chart); //定义
            that.chart.showLoading(); //等待的显示
            that.chart.setOption(option); //展示
            that.chart.resize(); //刷新画布
        },
        resize() {
            if (this.chart) {
                this.chart.resize();
            }
        },
    },
};

/**************************************时间格式化处理************************************/
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

function time_form(cjsj) {
    if (cjsj === null) return '-'
    var time_set = []
    var myDate = new Date(cjsj)
    // time_set = myDate.getMonth() + 1 + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
    return timestampToTime(cjsj)
}
</script>

<style scoped>
#chart {
    margin: 0 auto;
    width: 80%;
    height: 500px;
}
</style>
