// import './member_base.css'
// import './member.css'


import Vue from 'vue'
import router from './router'
import store from './vuex'

let view=new Vue({
    el:'#app',
    router,
    store
})