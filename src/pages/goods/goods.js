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

import Swipe from 'components/Swipe.vue'

let {id}=qs.parse(window.location.search.substring(1))
let detailTags=['商品详情','本店成交']

let view=new Vue({
    el:'#app',
    data:{
        id,
        detailsLists:null,
        dealLists:null,
        bannerLists:null,
        detailTags,
        curIndex:0
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then((response)=>{
                this.detailsLists=response.data.data
                this.bannerLists=[]
                this.detailsLists.imgs.forEach((value)=>{
                    this.bannerLists.push({
                        img:value,
                        clickUrl:'javascript:;'
                    })
                })
            })
        },
        chageCurIndex(index){
            this.curIndex=index
            if (index){
                this.getDeal()
            }
        },
        getDeal(){
            axios.post(url.deal,{id}).then((response)=>{
                this.dealLists=response.data.data.lists
            })
        }
    },
    components:{
        Swipe
    },
    mixins:[mixin]
})