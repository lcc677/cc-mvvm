class cVue {
    constructor(options) {
        this.$option = options
        this.$data = options.data
        this.observe(this.$data)
        new Watcher(this, "foo")
    }
    observe(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(subData, key, val) {
        this.observe(val)
        const dep = new Dep()
        Object.defineProperty(subData, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newValue) {
                val = newValue
                dep.notify()
            }
        })
    }
}
// 依赖
class Dep {
    constructor() {
        this.dep = []
    }
    addDep(dep) {
        this.dep.push(dep)
    }
    notify() {
        this.dep.forEach(item => item.update())
    }
}
// 监视器
class Watcher {
    constructor(vm, key) {
        this.vm = vm
        this.key = key
        Dep.target = this
    }
    update() {
        console.log("我来更新dom树了")
    }
}
