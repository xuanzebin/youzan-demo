import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import address from 'js/addressService.js'

const store=new Vuex.Store({
    state:{
        lists:null
    },
    mutations: {
        init(state,lists){
            state.lists=lists
        },
        add(state,instance){
            state.lists.push(instance)
        },
        edit(state,instance){
            let list=JSON.parse(JSON.stringify(state.lists))
            state.lists.forEach(address=>{
                if (address.id===instance.id){
                    address=instance
                }
            })
        }
    },
    actions: {
        getLists({commit}){
            address.getList().then(response=>{
                commit('init',response.data.lists)
            })
        },
        addAddress({commit},instance){
            address.addAddress(instance).then(response=>{
                //后台应返回ID,此处先用random模拟
                instance.id=parseInt(Math.random()*100000)
                commit('add',instance)
            })
        },
        editAddress({commit},instance){
            address.editAddress(instance).then(response=>{
                commit('edit',instance)
            })
        }
    }
})

export default store