import url from 'js/api.js'
import fetch from 'js/fetch.js'

class address{
    static getList(){
        return fetch(url.addressLists)
    }
    static addAddress(data){
        return fetch(url.addressAdd,data)
    }
    static editAddress(data){
        return fetch(url.addressUpdate,data)
    }
    static defaultAddress(data){
        return fetch(url.addressDefault,data)
    }
    static removeAddress(data){
        return fetch(url.addressRemove,data)
    }
}

export default address