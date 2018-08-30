import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import axios from 'axios'

let view=new Vue({
    el:'.container',
    data:{
        cartLists:null
    },
    created(){
        this.getLists()
    },
    computed:{
        allSelect:{
            get(){
                if(this.cartLists&&this.cartLists.length){
                    return this.cartLists.every(shop=>{
                            return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                if(this.cartLists&&this.cartLists.length){
                    this.cartLists.forEach(shop=>{
                        shop.checked=newVal
                        shop.goodsList.forEach(good=>{
                            good.checked=newVal
                        })
                    })
                }
                return false
            }
        }
    },
    methods:{
        getLists(){
            axios.post(url.cartLists).then((response)=>{
                let list=response.data.cartList
                list.forEach(shop=>{
                    shop.checked=true
                    shop.goodsList.forEach(good=>{
                        good.checked=true
                    })
                })
                this.cartLists=list
            })
        },
        goodSelect(shop,good){
            good.checked=!good.checked
            shop.checked=shop.goodsList.every(good=>{
                return good.checked
            })
        },
        shopSelect(shop,shopIndex){
            shop.checked=!shop.checked
            shop.goodsList.forEach(good=>{
                good.checked=shop.checked
            })
        },
        selectAll(){
            this.allSelect=!this.allSelect
        }
    },
    mixins:[mixin]
})