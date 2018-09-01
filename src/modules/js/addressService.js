import url from 'js/api.js'
import fetch from 'js/fetch.js'

class address{
    static getList(){
        return fetch(url.addressLists)
    }
}

export default address