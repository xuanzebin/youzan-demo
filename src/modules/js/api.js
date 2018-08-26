let url={
    hostLists:'/index/hotlists',
    bannerLists:'/index/banner',
    topLists:'/category/topList',
    subLists:'/category/subList',
    rank:'/category/rank',
    searchLists:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    evaluation:'/goods/evaluation'
}

let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url){
    url[key]=host+url[key]
}
export default url