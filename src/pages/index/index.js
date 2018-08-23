import './index.css'
import 'css/common.css'

import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'


import MintUI from 'mint-ui'
Vue.use(MintUI)

let view=new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoad:false
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            if (this.allLoad) return
            this.loading=true
            axios.post(url.hostLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((response)=>{
                let currentList=response.data.lists
                if (currentList.length<this.pageSize) this.allLoad=true
                if (this.lists) {
                    this.lists=this.lists.concat(currentList)
                } else {
                    this.lists=currentList
                }
                this.pageNum++
                this.loading=false
            })
        }
    }
})