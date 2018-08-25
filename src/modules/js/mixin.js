import Footnav from 'components/FootNav.vue'
let mixin={
    filters:{
        currency(num){
            num=num+''
            let arr=num.split('.')
            if (arr.length===1){
                return num+'.00'
            } else {
                if (arr[1].length===1){
                    return num+'0'
                } else return num
            }
        }
    },
    components:{
        Footnav
    }
}
export default mixin