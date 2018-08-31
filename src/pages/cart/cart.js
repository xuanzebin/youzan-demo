import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import axios from 'axios'

let view=new Vue({
    el:'#app',
    data:{
        cartLists:null,
        total:0,
        totalNum:'',
        editingShop:null,
        editingShopIndex:-1,
        removePopup:false,
        removeData:null,
        removeMsg:'确定要删除该商品么?'
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
        },
        selectList(){
            if (this.cartLists&&this.cartLists.length){
                let arr=[]
                let total=0
                this.cartLists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if (good.checked){
                            arr.push(good)
                            total+=good.price*good.number
                        }
                    })
                })
                this.total=total
                if (JSON.stringify(arr)!=='[]') {
                    this.totalNum=`(${arr.length})` 
                } else {
                    this.totalNum=''
                }
                return arr
            }
            return []
        },
        allRemoveSelect:{
            get(){
                if (this.editingShop){
                    return this.editingShop.goodsList.every(good=>{
                        return good.removeChecked
                    })
                }
                return false
            },
            set(newVal){
                if (this.editingShop){
                    this.editingShop.removeChecked=newVal
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked=newVal
                    })
                }
            }
        },
        removeList(){
            if (this.editingShop) {
                let arr=[]
                this.editingShop.goodsList.forEach(good=>{
                    if (good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }
    },
    methods:{
        getLists(){
            axios.post(url.cartLists).then((response)=>{
                let list=response.data.cartList
                list.forEach(shop=>{
                    shop.checked=true
                    shop.editingStatus=false
                    shop.editingMsg='编辑'
                    shop.removeChecked=false
                    shop.goodsList.forEach(good=>{
                        good.checked=true
                        good.removeChecked=false
                    })
                })
                this.cartLists=list
            })
        },
        goodSelect(shop,good){
            let attr=shop.editingStatus?'removeChecked':'checked'
            good[attr]=!good[attr]
            shop[attr]=shop.goodsList.every(good=>{
                return good[attr]
            })
        },
        shopSelect(shop,shopIndex){
            let attr=shop.editingStatus?'removeChecked':'checked'
            shop[attr]=!shop[attr]
            shop.goodsList.forEach(good=>{
                good[attr]=shop[attr]
            })
        },
        selectAll(){
            if (!this.editingShop){
                this.allSelect=!this.allSelect
            } else {
                this.allRemoveSelect=!this.allRemoveSelect
            }
        },
        editingSwitch(shop,shopIndex){
            shop.editingStatus=!shop.editingStatus
            shop.editingMsg=shop.editingStatus?'完成':'编辑'
            this.editingShop=shop.editingStatus?shop:null
            this.editingShopIndex=shop.editingStatus?shopIndex:-1
            this.cartLists.forEach((otherShop,index)=>{
                if (index!==shopIndex){
                   otherShop.editingMsg=shop.editingStatus?'':'编辑'
                }
            })
        },
        removeSingelGood(good,goodIndex,shop,shopIndex){
            this.removePopup=true
            this.removeData={good,goodIndex,shop,shopIndex}
            this.removeMsg='确定要删除该商品么?'
        },
        removeConfirm(){
            this.removePopup=false
            if (this.removeMsg==='确定要删除该商品么?'){
                let {good,goodIndex,shop,shopIndex}=this.removeData
                axios.post(url.remove,{id:good.id}).then(response=>{
                    shop.goodsList.splice(goodIndex,1)
                    if (!shop.goodsList.length) {
                        this.cartLists.splice(shopIndex,1)
                        this.removeComplete()
                    }
                })
            } else {
                let ids=[]
                this.editingShop.goodsList.forEach(good=>{
                    if (good.removeChecked) ids.push(good.id)
                })
                axios.post(url.mrremove,{id:ids}).then(response=>{
                    let arr=[]
                    this.editingShop.goodsList.forEach(good=>{
                        if (!good.removeChecked) arr.push(good)
                    })
                    this.editingShop.goodsList=arr
                    if (!arr.length){
                        this.cartLists.splice(this.editingShopIndex,1)
                        this.removeComplete()
                    }
                })
            }
        },
        removeComplete(){
            this.editingShop=null
            this.editingShopIndex=-1
            this.cartLists.forEach(shop=>{
                shop.editingMsg='编辑'
                shop.editingStatus=false
            })
        },
        removeGoods(){
            this.removePopup=true
            let arr=this.removeList
            this.removeMsg=`确认删除所选的${arr.length}个商品?`
        },
        addGood(good,goodIndex){
            axios.post(url.add,{id:good.id}).then(response=>{
                good.number++
            })
        },
        reduceGood(good,goodIndex){
            if (good.number===1) return
            axios.post(url.reduce,{id:good.id}).then(response=>{
                good.number--
            })
        }
    },
    mixins:[mixin]
})