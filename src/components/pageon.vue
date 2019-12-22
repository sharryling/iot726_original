<template>
<div id="app">

    <router-link :to="{name:'/list_show'}"><!-- ,query:{token:token} -->
        <div class="back" @click="com_select_change"></div>
    </router-link>

    <el-container class="container">

        <el-header>
            <span class="head"> 数据中心</span>

            <router-link :to="{path:'/'}">
                <span class="backhead">注销</span>
            </router-link>
        </el-header>
        <el-container class="container">
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-demo" @select="handleSelect"  text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">温湿度曲线</el-menu-item>
                    <el-menu-item index="2">数据发送</el-menu-item>
                </el-menu>
            </el-aside>
<!-- background-color="#66707a" -->
            <el-main>
                <transition name="el-zoom-in-center">
                    <chart v-if="com_select ==1 || com_select==0" class="transition-box echart-box" v-bind:imei="imei"  :once="once"/>
                </transition>
                <transition name="el-zoom-in-center">
                      <text_com v-if="com_select==2" class="transition-box" v-bind:imei="imei" />
                </transition>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import text_com from "./text_com";
import chart from "./chart";
import $ from "jquery";
import Vue from "vue";
var data_get_addr = "temp_hum";
var data_sent_addr = "";

export default {
    name: "pageon",
    components: {
        text_com,
        chart
    },
    data() {
        return {
            //获取imei
            imei: 0,
            state: 0,
            com_select: 0,
            show2: true,
            once:true,
            /* token: '', */
        };
    },
    created() {
        let imei = this.$route.query.imei;
        let state = this.$route.query.state;
       /*  let token = this.$route.query.token; */
        console.log("imei", this.$route)
        this.imei = imei
        this.state = state
        /* this.token = token */
    },
    methods: {
        com_select_change(){
            this.once = false
            alert("asd+"+ this.once)
        },
        handleSelect(key, keyPath) {
            console.log("key=",key)
            
            this.com_select = key
            this.show2 = !this.show2
        },
    }
};

(function () {
    // We must use JS as we need to select previous
    // elements which can't be done with CSS.
    $('.skew-title').children('span').hover((function () {
        var $el, n;
        $el = $(this);
        n = $el.index() + 1;
        $el.addClass('flat');
        if (n % 2 === 0) {
            return $el.prev().addClass('flat');
        } else {
            if (!$el.hasClass('last')) {
                return $el.next().addClass('flat');
            }
        }
    }), function () {
        return $('.flat').removeClass('flat');
    });

}).call(this);
</script>

<style>
.container {
    height: -webkit-fill-available;
}

.back {
    position: fixed;
    left: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: url('../assets/images/back.png') no-repeat;
    background-size: cover;
    cursor: pointer;
}

body {

    font-size: .80em;

    font-family: "HelveticaNeue", "LucidaGrande", "SegoeUI", Arial, Helvetica, Verdana, sans-serif;

    color: #fff;

    /* background-color: #fff; */

    margin: 0 auto;

    padding: 0;

    height: 100%;

}

table {
    position: inherit;

}

#app {
    /*  font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    /* text-align: center; */
    /* color: #2c3e50; */

    /* margin-top: 60px; */

    height: 100%;
    overflow: auto;
    position: relative;
}

.back {
    position: fixed;
    left: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: url('../assets/images/back.png') no-repeat;
    background-size: cover;
    cursor: pointer;
}

.container {
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    margin: 0;
    padding: 0;

}
.login-form-input[data-v-2fe6cf0e] {
color:#bebdb5
}


.head {
    font-size: 32px;
    text-align: center;
    color: #e6e0b6;
    margin: 0ch
}

.echart-box {
     /* background-color: #dce0e2; */
     opacity: 0.7;
}

.transition-box {
    margin: 0 auto;
    margin-bottom: 10px;
    width: 1000px;
    height: inherit;
    border-radius: 4px;
 /*    background-color: #dce0e2; */
    text-align: center;
    color: rgb(226, 211, 211);
    padding: 40px 20px;
    box-sizing: border-box;
    /* margin-right: 20px; */
}
.el-menu{
    background-color:inherit;
}



.el-menu-demo:not(.el-menu--collapse) {
    width: auto;
    margin: 0 auto;
    text-align: center;
    height: 100%;
}

.el-header {
   /*  background-color: rgb(65, 76, 90); */
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
   /*  background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
   /*  background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    line-height: 10px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

/* 标题 */

.row {
    position: relative;
    height: 0px;
    z-index: 1;
    clear: both;
    margin-bottom: 30px;
    text-align: center;
}

.backhead {
    font-size: 14px;
    text-align: right;
    color: #bebdb5;
    float: right;
}

/* .row--intro {
  padding-top: 20px;
  font-size: 16px;
  line-height: 28px;
  font-weight: 250;
  color: #fff;
  opacity: 0.4;
}
.row--intro span {
  font-size: 11px;
} */
/* .skew-title {
  font-size: 25px;
} */
.skew-title span {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 50px;
    margin: auto;
    z-index: 2;
    text-align: center;
    color: #fff;
    font-family: 'roboto condensed';
    font-weight: 600;
    font-size: 18px;
    line-height: 50px;
    -webkit-transform: skewY(-15deg);
    transform: skewY(-15deg);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    transition: all 0.2s;
    cursor: default;
}

.skew-title span:after,
.skew-title span:before {
    display: block;
    top: 0;
    left: 0;
    width: 40px;
    height: 50px;
    position: absolute;
    background: #185a81;
    content: ' ';
    z-index: -1;
    transition: all 0.2s;
}

.skew-title span:before {
    background: rgba(0, 0, 0, 0.1);
    -webkit-transform: skewY(15deg);
    transform: skewY(15deg);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}

.skew-title span:nth-child(even) {
    /* background-color: #144c6e; */
    -webkit-transform: skewY(15deg);
    transform: skewY(15deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    color: #d9d9d9;
}

.skew-title span:nth-child(even):after {
    /* background-color: #144c6e; */
}

.skew-title span:nth-child(even):before {
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: skewY(-15deg);
    transform: skewY(-15deg);
}

.skew-title span.flat {
    -webkit-transform: skewY(0);
    transform: skewY(0);
    color: #fff;
}

.skew-title span.flat:before {
    -webkit-transform: skewY(0);
    transform: skewY(0);
}

.skew-title span.flat:nth-child(even):after {
    background-color: #185a81;
}

.skew-title span.alt:after {
    background-color: #b94a2c;
}

.skew-title span.alt:nth-child(even):after {
    background-color: #9d3f25;
}

.skew-title span.alt.flat:nth-child(even):after {
    background-color: #b94a2c;
}
</style>
