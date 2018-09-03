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
        editInit:0,
        provinceName:'',
        cityName:'',
        districtName:''
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
          this.provinceName=ad.provinceName
          this.cityName=ad.cityName
          this.districtName=ad.districtName
      }
  },
  computed: {
    addressList(){
        return this.$store.state.lists
    }
  },
  methods: {
      saveAddress(){
          let {name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName}=this
          let data={name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName}
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
        //   this.isDefault=!this.isDefault
        //   address.defaultAddress({id}).then(response=>{
        //   })
          this.$store.dispatch('defaultAddress',id)
      },
      removeAddress(){
          let id=this.id
          if (window.confirm('确认要删除吗？')){
            // address.removeAddress({id}).then(response=>{
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('removeAddress',id)
          }
      }
  },
  watch:{
      provinceValue(val,oldVal){
          if (val===-1) {
              this.provinceName='选择省份'
              return 
          } 
          let index=this.addressData.list.findIndex(province=>{
              return province.value===val
          })
          this.provinceName=this.addressData.list[index].label
          this.cityList=this.addressData.list[index].children
          this.cityValue=-1
          this.districtValue=-1
          if (this.type==='edit' && parseInt(this.instance.provinceValue)===val && this.editInit!==2){
              this.editInit++
              this.cityValue=parseInt(this.instance.cityValue)
          }
      },
      cityValue(val,oldVal){
          if (val===-1){
              this.cityName='选择城市'
              return 
          } 
          let index=this.cityList.findIndex(city=>{
              return city.value===val
          })
          this.cityName=this.cityList[index].label
          this.districtList=this.cityList[index].children
          this.districtValue=-1
          if (this.type==='edit' && parseInt(this.instance.cityValue)===val && this.editInit!==2){
              this.editInit++
              this.districtValue=parseInt(this.instance.districtValue)
          }
      },
      districtValue(val,oldVal){
        if (val===-1){
            this.districtName='选择地区'
            return
        }
        let index=this.districtList.findIndex(district=>{
            return district.value===val
        })
        this.districtName=this.districtList[index].label
      },
      addressList:{
        handler(){
            this.$router.go(-1)
        },
        deep:true
      }
  }
}