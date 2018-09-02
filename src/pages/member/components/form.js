import address from 'js/addressService.js'
export default {
  data(){
    return {
        name:'',
        tel:'',
        provinceValue:-1,
        cityValue:-1,
        districtValue:-1,
        address:'',
        id:'',
        type:this.$route.query.type,
        instance:this.$route.query.instance,
        addressData:require('./address.json'),
        cityList:null,
        districtList:null,
        isDefault:false,
        editInit:0
    }
  },
  created(){
      if (this.type=='edit'){
          let ad=this.instance
          this.name=ad.name
          this.tel=ad.tel
          this.address=ad.address
          this.provinceValue=parseInt(ad.provinceValue)
          this.cityValue=parseInt(ad.cityValue)
          this.districtValue=parseInt(ad.districtValue)
          this.isDefault=ad.isDefault
          this.id=ad.id
      }
  },
  methods: {
      saveAddress(){
          let {name,tel,provinceValue,cityValue,districtValue,address}=this
          let data={name,tel,provinceValue,cityValue,districtValue,address}
          if (this.type==='add'){
            // address.addAddress(data).then(response=>{
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('addAddress',data)
          } else {
            data.id=this.id
            // address.editAddress(data).then(response=>{
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('editAddress',data)
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
      provinceValue(val,oldVal){
          if (val===-1) return 
          let index=this.addressData.list.findIndex(province=>{
              return province.value===val
          })
          this.cityList=this.addressData.list[index].children
          this.cityValue=-1
          this.districtValue=-1
          if (this.type==='edit' && parseInt(this.instance.provinceValue)===val && this.editInit!==2){
              this.editInit++
              this.cityValue=parseInt(this.instance.cityValue)
          }
      },
      cityValue(val,oldVal){
          if (val===-1) return 
          let index=this.cityList.findIndex(city=>{
              return city.value===val
          })
          this.districtList=this.cityList[index].children
          this.districtValue=-1
          if (this.type==='edit' && parseInt(this.instance.cityValue)===val && this.editInit!==2){
              this.editInit++
              this.districtValue=parseInt(this.instance.districtValue)
          }
      }
  }
}