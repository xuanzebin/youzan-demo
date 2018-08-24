import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'


let {keyword,id}=qs.parse(window.location.search.substring(1))

let view=new Vue({
    el:'.container',
    data:{
        keyword,
        id,
        pageNum:1,
        pageSize:8,
        searchLists:null
    },
    created(){
        this.getSearchLists()
    },
    methods:{
        getSearchLists(){
            axios.post(url.searchLists,{id,keyword,pageNum:this.pageNum,pageSize:this.pageSize}).then((response)=>{
                this.searchLists=response.data.lists
            })
        }
    },
    mixins:[mixin]
})