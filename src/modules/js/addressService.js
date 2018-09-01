import url from 'js/api.js'
import fetch from 'js/fetch.js'

class address{
    static getList(){
        return fetch(url.addressLists)
    }
    static addAddress(data){
        return fetch(url.addressAdd,data)
    }
}

export default address