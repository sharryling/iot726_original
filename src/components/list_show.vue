<template>
<div id="listshow">
    <div v-show="this.$route.name==='/list_show'">
        <router-link to="/">
            <div class="back" @click="back()"></div>
        </router-link>

        <div class="listshow-box">
            <div class="logo"></div>
            <form>
                <div class="divpart" v-for="(item) in imei_ifo" :key="item.imei">
                    <span style="font-size: 32px;">imei:{{ item.imei}}</span><br/>
                    <span style="font-size: 32px;">状态：{{ item.status}}</span><br/>
                    <el-button type="success" icon="el-icon-circle-check-outline" circle disabled v-show="item.status==0"></el-button>
                    <router-link :to="{name:'/pageon',query:{imei:item.imei,status:item.status}}" v-show="item.status==1">
                        <el-button type="success" icon="el-icon-circle-check-outline" circle></el-button>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import Stars from '../../static/js/Star'
import Moon from '../../static/js/Moon'
import Meteor from '../../static/js/Meteor'

import dialog from '@/components/Dialog'
import $ from "jquery";
import data from '.././util/mock';
//var getdevstate_addr = "http://g.cn"
var getdevstate_addr = "http://111.231.244.208:8081/devStatus"
export default {
    components: {
        'v-dialog': dialog
    },
    props: {
        /* listshow: {
            type: Boolean
        }, */
        admin: {
            type: Boolean
        },
        customer: {
            type: Boolean
        },

    },
    data() {
        return {
            account: 'test2',
            password: '123456',
            userid: '',
            dialog: false,
            dialogMsg: '',
            imei_ifo: [],
            /* {imei:0,status:0}  {}  {} */
            com_select: 1,
            show2: true,
            activeIndex: '1',
            activeIndex2: '1',
            //token:'',
        }
    },
    create: function () {

    },

    mounted: function () {
        /* this.$nextTick(function () {
            setInterval(this.listshow, 15000);
        }) */
        this.listshow()
       // this.token = this.$route.query.token

    },

    methods: {
        back() {
            
        },
        listshow() {
            var that = this;
            $.get(
                getdevstate_addr,
                function (result) {
                    //result = JSON.parse(result)
                    that.imei_ifo = result.res

                }
            );

        }
    }
}
</script>

<style scoped>
#listshow {
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

.gv {
    text-decoration: none;
    background: url('../assets/images/nav_gv.png') repeat 0px 0px;
    width: 130px;
    height: 43px;
    display: block;
    text-align: center;
    line-height: 43px;
    cursor: pointer;
    float: left;
    margin: 10px 2px 10px 2px;
    font: 18px/43px 'microsoft yahei';
    color: #066197;
}

a.gv:hover {
    background: url('../assets/images/nav_gv.png') repeat 0px -43px;
    color: #1d7eb8;
    -webkit-box-shadow: 0 0 6px #1d7eb8;
    transition-duration: 0.5s;
}

.listshow-box {
    width: 80%;
    padding: 50px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100001;
}

.listshow-box .logo {
    width: 270px;
    height: 108px;
    opacity: 0.25;
    margin-bottom: 20px;
    background: url('../assets/images/iot图标1.png') no-repeat;
    background-size: cover;
}

.ipunt-wrap label {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-right: 10px;
    background-size: cover;
}

.icon-id {
    background: url('../assets/images/id.png') no-repeat;
}

.icon-user {
    background: url('../assets/images/user.png') no-repeat;
}

.icon-password {
    background: url('../assets/images/password.png') no-repeat;
}

.ipunt-wrap input {
    border: none;
    outline: none;
    background: none;
    border-bottom: 1px solid #fff;
    margin-top: 30px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    /* text-align: center; */
    color: #fff;
    font-size: 14px;
    padding: 0 5px;
}

.button {
    margin-top: 30px;
    margin-left: 60px
}

.toregist {
    font-size: 12px;
    float: right;
    padding-top: 20px;
    color: #fff;
}

.toregist a {
    color: #066197;
    text-decoration: none;
}

.divpart {
    width: 22%;
    height: 22%;
    /* background-color: #8f9499; */
    margin-bottom: 100px;
    margin-right: 50px;
    margin-left: 50px;
    padding: 5px;
    text-align: center;
    display: inline-table;
    font-size: 22px;
    font-family: "微软雅黑";
    border-radius: 15%;
    border-top: 5px solid rgb(99, 87, 48);
    border-bottom: 5px solid rgb(170, 151, 151);
    color: #a8af66;
    /* background: url('../assets/images/border1.png') repeat 0px 0px; */

}

.block {
    /* height: 500px; */
    width: 800px;
    margin: auto;
    font-size: 35px;
    font-family: "STKaiti";
    /*  //"微软雅黑"; */
    margin-top: 100px;
    color: #d8dbba;
}
</style>
