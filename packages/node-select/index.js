// 导入组件
import nodeSelect from './src/node-select.vue'

nodeSelect.install = function(Vue) {
  Vue.component(nodeSelect.name, nodeSelect)
}

export default nodeSelect
