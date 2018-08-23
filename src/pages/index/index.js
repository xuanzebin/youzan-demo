import './index.css'
import 'css/common.css'

import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue';

let view=new Vue({
    el:'#app',
    data:{
        lists:null
    },
    created(){
        axios.post(url.hostLists,{
            pageNum:1,
            pageSize:6
        }).then((response)=>{
            console.log(response.data)
            this.lists=response.data.lists
        })
    }
})