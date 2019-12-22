<template>
<div>
    <div class="textareaa">
        <textarea name="txt" v-model="Content" class="login-form-input" autofocus="true" rows="5"  placeholder="请输入内容" />
</div>
   <button class="button" style="vertical-align:middle margin: 0 auto;"  v-on:click="sentContent(0)"  ><span>MQTT发送 </span></button>
    <button class="button" style="vertical-align:middle margin: 0 auto;"  v-on:click="sentContent(1)"  ><span>NB发送 </span></button>
   </div>
</template>

<script>
var sent_addr = 'http://111.231.244.208:8081/lcd'
export default {
    data() {
        return {
            Content: ''
        }
    },
    props: [
        'imei'
    ],
    methods: {
        sentContent(channel) {
            var param = {};
            param = {
                content: this.Content,
                channel: channel,
            };
            console.log("adsf:", typeof (this.Content))
            var that = this;
            $.post(sent_addr + '?imei=' + this.imei + '?token=' + this.token,
                param,
                function (result) {
                    alert("已发送！")
                });
        },

    }
}
</script>

<style scoped>
.textareaa {
    width: 500px;
    height: 200px;
    margin: 0 auto;
}

.login-form-input {
    margin: 0 auto;
    border-radius: 1px;
    background-color: rgba(39, 47, 53, 0.062);
    width: 500px;
    height: 200px;
    font-size: 18px;
    font-family: Microsoft YaHei;
}

.button {
    display: inline-block;
    border-radius: 4px;
    background-color: #225c7e;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    width: 125px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
}

.button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

.button span:after {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

.button:hover span {
    padding-right: 25px;
}

.button:hover span:after {
    opacity: 1;
    right: 0;
}
</style>
