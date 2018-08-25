import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'

import MintUI from 'mint-ui'
Vue.use(MintUI)

import Velocity from 'velocity-animate/velocity.js'
import 'velocity-animate/velocity.ui.js'

let {keyword,id}=qs.parse(window.location.search.substring(1))

let view=new Vue({
    el:'.container',
    data:{
        keyword,
        id,
        pageNum:1,
        pageSize:8,
        searchLists:null,
        searchLoading:false,
        allLoad:false,
        isShow:false
    },
    created(){
        this.getSearchLists()
    },
    methods:{
        getSearchLists(){
            if (this.allLoad) return 
            this.searchLoading=true
            axios.post(url.searchLists,{
                id,
                keyword,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((response)=>{
                let currentList=response.data.lists
                if (currentList.length<this.pageSize) this.allLoad=true
                if (this.searchLists){
                    this.searchLists=this.searchLists.concat(currentList)
                } else {
                    this.searchLists=currentList
                }
                this.pageNum++
                this.searchLoading=false
            })
        },
        scrollMove(){
            if (window.scrollY>=290){
                this.isShow=true
            } else {
                this.isShow=false
            }
        },
        goToTop(){
            Velocity(document.body, 'scroll', { duration: 500, easing: "easeOutQuart" });
            this.isShow=false
        }
    },
    mixins:[mixin]
})