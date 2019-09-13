<template>
  <div>
    <node-select
      :data="data"
      :isShow="isShow"
      @close="close"
      @selectDepartment="handleSelectDepartment"
      textField="name"
    ></node-select>
    <h5>
      当前选中的部门为:
      <br />
      {{ title === '' ? '无' : title }}
    </h5>
    <button
      @click="handleClick"
      class="btn block"
    >显示部门(节点树)选择组件</button>
  </div>
</template>

<script>
import NodeSelect from '../packages/node-select'
export default {
  name: 'app',
  components: {
    NodeSelect,
  },
  data() {
    return {
      isShow: false,
      data: [
        {
          id: 1,
          instituteId: 598,
          userId: 1,
          name: '中国',
          parentId: 0,
          nodeSize: 2,
        },
        {
          id: 16,
          instituteId: 598,
          userId: 1,
          name: '日本',
          parentId: 0,
          nodeSize: 3,
        },
        {
          id: 17,
          instituteId: 598,
          userId: 1,
          name: '11',
          parentId: 1,
          nodeSize: 0,
        },
        {
          id: 19,
          instituteId: 598,
          userId: 1,
          name: '111',
          parentId: 1,
          nodeSize: 0,
        },
        {
          id: 18,
          instituteId: 598,
          userId: 1,
          name: '七龙珠',
          parentId: 16,
          nodeSize: 0,
        },
        {
          id: 20,
          instituteId: 598,
          userId: 1,
          name: '海贼王',
          parentId: 16,
          nodeSize: 0,
        },
        {
          id: 50,
          instituteId: 598,
          userId: 1,
          name: '火影忍者',
          parentId: 16,
          nodeSize: 0,
        },
      ],
      title: '',
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    open() {
      this.isShow = true
    },
    handleClick() {
      this.open()
    },
    handleSelectDepartment(ancestors, currentNode) {
      this.close()
      const nodes = [...ancestors, currentNode]
      this.title = nodes.map(node => `${node.level}级 ${node.name}`).join('/')
    },
  },
}
</script>

<style lang="stylus">
.btn
  display block
  height 43px
  border 1px solid #f10180
  border-radius 5px
  background #f10180
  color #fff
  text-align center
  text-decoration none
  font-weight bold
  font-size 18px
  line-height 43px

  &.block
    margin 200px auto

  &:hover
    text-decoration underline
</style>
