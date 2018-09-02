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
            state.lists.forEach((address,index)=>{
                if (address.id===instance.id){
                    list[index]=instance
                }
            })
            state.lists=list
        },
        setDefault(state,id){
            state.lists.forEach((address,index)=>{
                if (address.id===id){
                    state.lists[index].isDefault=true
                } else {
                    state.lists[index].isDefault=false
                }
            })
        },
        remove(state,id){
            let index=state.lists.findIndex(address=>{
                return address.id===id
            })
            if (state.lists.length && state.lists[index].isDefault){
                state.lists.splice(index,1)
                state.lists[0].isDefault=true
            } else {
                state.lists.splice(index,1)
            }
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
        },
        defaultAddress({commit},id){
            address.defaultAddress({id}).then(response=>{
                commit('setDefault',id)
            })
        },
        removeAddress({commit},id){
            address.removeAddress({id}).then(response=>{
                commit('remove',id)
            })
        }
    }
})

export default store