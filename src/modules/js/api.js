let url={
    hostLists:'/index/hotlists',
    bannerLists:'/index/banner'
}

let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url){
    url[key]=host+url[key]
}
export default url