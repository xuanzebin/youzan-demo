import axios from 'axios'
function fetch(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(response=>{
            let status=response.data.status
            // if (status===200) resolve(response)
            // if (status===300) {
            //     location.href='member.html'
            //     resolve(response)
            // }
            resolve(response)
        }).catch(error=>{
            reject(error)
        })
    })
}

export default fetch