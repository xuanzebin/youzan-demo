import address from 'js/addressService.js'
export default {
  data(){
    return {
        name:'',
        tel:'',
        provinceValue:-1,
        cityValue:-1,
        districtValue:-1,
        addressValue:'',
        id:'',
        type:this.$route.query.type,
        instance:this.$route.query.instance,
        addressData:require('./address.json'),
        cityList:null,
        districtList:null
    }
  },
  created(){
  },
  methods: {
      saveAddress(){
          let {name,tel,provinceValue,cityValue,districtValue,addressValue}=this
          let data={name,tel,provinceValue,cityValue,districtValue,addressValue}
          address.addAddress(data).then(response=>{
              this.$router.go(-1)
          })
      }
  },
  watch:{
      provinceValue(val){
          if (val===-1) return 
          let index=this.addressData.list.findIndex(province=>{
              return province.value===this.provinceValue
          })
          this.cityList=this.addressData.list[index].children
          this.cityValue=-1
          this.districtValue=-1
      },
      cityValue(val){
          if (val===-1) return 
          let index=this.cityList.findIndex(city=>{
              return city.value===this.cityValue
          })
          this.districtList=this.cityList[index].children
          this.districtValue=-1
      }
  }
}