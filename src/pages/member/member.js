// import './member_base.css'
// import './member.css'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes=[{
    path:'/',
    components: require('./components/member.vue')
}]

let router=new Router({
    routes
})

let view=new Vue({
    el:'#app',
    router
})