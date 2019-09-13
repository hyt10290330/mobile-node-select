<template>
  <div>
    <node-select
      :data="data"
      :isShow="isShow"
      @close="close"
      textField="name"
    ></node-select>
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
      isShow: true,
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
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
  },
}
</script>

<style lang="stylus"></style>
