class cVue{
  constructor(options){
    this.$options = options
    this.$data = this.$options.data
    this.observe(this.$data)
  }
  observe(data){
    if(!data || typeof data !== 'object'){
      return
    }
    Object.keys(data).forEach((val,index) =>{
      this.defineReactive(data,val,data[val])
    })
  }
  defineReactive(obj, key, val){
    this.observe(val)
    Object.defineProperty(obj,key,{
      get(){
        console.log("我获取了属性:" + key)
        return val
      },
      set(newVal){
        val = newVal
        console.log("我设置了属性"); 
      }
    })
  }
}

const cv = new cVue({
  data:{
    name:"Tom",
    age:{
      xusui:18,
      zhousui:19
    }
  }
})
console.log(cv.$data.name)
console.log(cv.$data.age.xusui)