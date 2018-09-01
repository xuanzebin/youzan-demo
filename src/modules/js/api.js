let url={
    hostLists:'/index/hotlists',
    bannerLists:'/index/banner',
    topLists:'/category/topList',
    subLists:'/category/subList',
    rank:'/category/rank',
    searchLists:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    evaluation:'/goods/evaluation',
    cartLists:'/cart/list',
    remove:'/cart/remove',
    mrremove:'/cart/mrremove',
    add:'/cart/add',
    reduce:'/cart/reduce',
    addressAdd:'/address/add',
    addressRemove:'/address/remove',
    addressLists:'/address/list',
    addressUpdate:'/address/update',
    addressDefault:'/address/setDefault'
}

let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url){
    url[key]=host+url[key]
}
export default url