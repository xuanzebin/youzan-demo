import fetch from 'js/fetch'
import url from 'js/api.js'

class cart{
    static add(id){
        return fetch(url.add,{id,number:1})
    }
    static reduce(id){
        return fetch(url.reduce,{id,number:-1})
    }
    static remove(id){
        return fetch(url.remove,{id})
    }
    static mrremove(id){
        return fetch(url.mrremove,{ids})
    }
    static getCartLists(){
        return fetch(url.cartLists)
    }
}

export default cart