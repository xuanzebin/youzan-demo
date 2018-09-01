<template>
    <div class="container " style="min-height: 597px;">
        <div class="block-list address-list section section-first js-no-webview-block">
            <a class="block-item js-address-item address-item " @click="toEdit">
            <div class="address-title">tony 13112345678</div>
            <p>广东省珠海市香洲区南方软件园</p>
            </a>
            <a class="block-item js-address-item address-item address-item-default" href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;id=69150193&amp;from=">
            <div class="address-title">tony 13112345678</div>
            <p>北京市北京市东城区天安门</p>
            </a>
        </div>
        <div class="block stick-bottom-row center">
            <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form'}">
                新增地址
            </router-link>
        </div>
    </div>
</template>
<style>
    @import 'address_base.css';
    @import 'address.css';
</style>
<script>
export default {
    methods:{
        toEdit(){
            this.$router.push({path:'form'})
        }
    }
}
</script>




