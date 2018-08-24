import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import Footnav from 'components/Footnav.vue'
import url from 'js/api.js'

let view=new Vue({
    el:'#app',
    data:{
        topLists:null,
        subLists:null,
        rankData:null,
        topIndex:0
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    methods:{
        getTopList(){
            axios.get(url.topLists).then((response)=>{
                this.topLists=response.data.lists
            })
        },
        getSubList(index,id){
            this.topIndex=index
            if (index===0){
                this.getRank()
            } else {
                axios.post(url.subLists,{id}).then((response)=>{
                    this.subLists=response.data.data
                })
            }
        },
        getRank(){
            axios.get(url.rank).then((response)=>{
                this.rankData=response.data.data
            })
        }
    },
    components:{
        Footnav
    },
    filters:{
        priceNumber(num){
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
    }
})