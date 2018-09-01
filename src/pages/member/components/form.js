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
        districtList:null,
        isDefault:false
    }
  },
  created(){
      if (this.type=='edit'){
          let ad=this.instance
          this.name=ad.name
          this.tel=ad.tel
          this.addressValue=ad.address
          this.provinceValue=parseInt(ad.provinceValue)
          this.cityValue=parseInt(ad.cityValue)
          this.districtValue=parseInt(ad.districtValue)
          this.isDefault=ad.isDefault
      }
  },
  methods: {
      saveAddress(){
          let {name,tel,provinceValue,cityValue,districtValue,addressValue}=this
          let data={name,tel,provinceValue,cityValue,districtValue,addressValue}
          if (this.type==='add'){
            address.addAddress(data).then(response=>{
                this.$router.go(-1)
            })
          } else {
            data.id=this.id
            address.editAddress(data).then(response=>{
                this.$router.go(-1)
            })
          }
      },
      defaultAddress(){
          let id=this.id
          this.isDefault=!this.isDefault
          address.defaultAddress({id}).then(response=>{
          })
      },
      removeAddress(){
          let id=this.id
          if (window.confirm('确认要删除吗？')){
            address.removeAddress({id}).then(response=>{
                this.$router.go(-1)
            })
          }
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