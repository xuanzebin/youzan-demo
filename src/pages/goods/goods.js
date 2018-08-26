import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'

let {id}=qs.parse(window.location.search.substring(1))

let view=new Vue({
    el:'#app',
    data:{
        id,
        detailsLists:null
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then((response)=>{
                this.detailsLists=response.data
            })
        }
    }
})