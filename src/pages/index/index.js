import './index.css'
import 'css/common.css'

import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'


import MintUI from 'mint-ui'
Vue.use(MintUI)

import Footnav from 'components/FootNav.vue'
import Swipe from 'components/Swipe.vue'
import mixin from 'js/mixin.js'
let view=new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoad:false,
        bannerLists:null
    },
    created(){
        this.getList()
        this.getBannerList()
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
        },
        getBannerList(){
            axios.get(url.bannerLists).then((response)=>{
                this.bannerLists=response.data.lists
            })
        },
        showGoods(){
            window.location.href=`/goods?id=${list.id}`
        }
    },
    filters:{
        currency(num){
            num=num+''
            let arr=num.split('.')
            if (arr.length===1){
                return num+'.00'
            } else {
                if (arr[1].length===1){
                    return num+'0'
                } else return num
            }
        }
    },
    components:{
        Footnav,
        Swipe
    }
})