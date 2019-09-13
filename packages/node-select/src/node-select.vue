<template>
  <div class="department-choice">
    <popup
      :isShow="isShow"
      @end="onTransitionEnd"
      @touchBg="onTouchBg"
    >
      <template slot="content">
        <div class="department-choice-wrapper">
          <div
            class="calculate-clock"
            ref="calculate"
          ></div>
          <div class="department-choice-header">
            <h2>所在部门</h2>
            <div
              @click="onClose"
              class="close"
            >×</div>
          </div>
          <div class="department-choice-content">
            <div
              class="department-choice-content-top"
              v-if="selectedKeys.length"
            >
              <scroll
                :data="selectedItem"
                ref="selectedScroll"
              >
                <div ref="selectedContainer">
                  <step
                    :key="index"
                    :linePattern="getLinePattern(index, selectedItem.length)"
                    :textActive="!isActiveDesc && lastClickIdValue === item.id"
                    :title="getTitle(item)"
                    @click.native="onGetChildren(item)"
                    solid
                    v-for="(item, index) in selectedItem"
                  ></step>
                  <step
                    :textActive="isActiveDesc"
                    linePattern="half-top"
                    title="请选择部门"
                    v-if="isShowDesc"
                  ></step>
                </div>
              </scroll>
            </div>
            <div class="department-choice-content-bottom">
              <scroll
                :data="departmentData"
                ref="departmentScroll"
              >
                <ul>
                  <li
                    class="department-item remark"
                    v-if="departmentData && departmentData.length"
                  >{{ departmentData[0].level }}级部门</li>
                  <li
                    :class="{ selected: getSelectStatus(item) }"
                    :key="index"
                    @click="onSelectItem(item)"
                    class="department-item"
                    v-for="(item, index) in departmentData"
                  >
                    {{ item[textField] }}
                    <div
                      class="icon icongou_ iconfont"
                      v-if="getSelectStatus(item)"
                    ></div>
                  </li>
                </ul>
              </scroll>
            </div>
          </div>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
import Popup from './popup'
import Scroll from './scroll/scroll'
import Step from './step'
import _ from 'lodash'

export default {
  name: 'nodeSelect',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    isContainRoot: {
      type: Boolean,
      default: false,
    },
    isCanSelectNonLeafNodes: {
      // 是否可以选择非叶子节点, 即人和部门可以在同一个层级
      type: Boolean,
      default: false,
    },
    textField: {
      type: String,
      default: 'title',
    },
    root: {
      type: Object,
      default: () => ({
        id: 0,
        parentId: null,
        name: '根',
        title: '根',
      }),
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      departmentData: [],
      selectedItem: [],
      isActiveDesc: true,
      lastClickIdValue: 0,
    }
  },
  components: {
    Popup,
    Scroll,
    Step,
  },
  computed: {
    selectedKeys() {
      return this.selectedItem.map(item => item.id)
    },
    isShowDesc() {
      const lastIndex = this.selectedItem.length - 1
      const TData = this.TData
      const id = this.selectedItem[lastIndex].id
      return TData
        ? Array.isArray(TData[id].children) && TData[id].children.length
        : false
    },
  },
  created() {
    this.TData = {}
    this.selectedContainerMaxHeight = 0
    this.departmentContainerMaxHeight = 0
    this.data.unshift(this.root)
    const ret = this._normalizeData(this.data)
    this._setLevel(ret)

    // 增加这个部门的本部选项
    if (this.isCanSelectNonLeafNodes) {
      this._addSelfDepartment()
    }
    this.departmentData = this.isContainRoot ? ret : ret[0].children
  },
  methods: {
    onTransitionEnd() {
      setTimeout(() => {
        // eslint-disable-next-line
        const calculate = this.$refs.calculate
        this.selectedContainerMaxHeight = calculate.clientHeight
        this.departmentContainerMaxHeight = calculate.clientWidth
      }, 20)
    },
    onTouchBg() {
      this.$emit('touchBg')
    },
    onClose() {
      this.$emit('close')
    },
    getLinePattern(index, total) {
      if (index === 0) {
        return 'half-bottom'
      } else {
        if (index === total - 1 && !this.isShowDesc) {
          // 如果是最后一个部门高亮且是叶子节点
          return 'half-top'
        }
        return 'full'
      }
    },
    getSelectStatus(item) {
      return this.selectedKeys.includes(item.id)
    },
    getTitle(item) {
      return `${item.level}级 ${item[this.textField]}`
    },
    onGetChildren(item) {
      const TData = this.TData
      const parentNode = TData[item.parentId]
      this.isActiveDesc = false
      this.lastClickIdValue = item.id
      if (parentNode && parentNode.children && parentNode.children.length) {
        this.departmentData = parentNode.children
      }
    },
    onSelectItem(item) {
      // 每次点击时先判断它父节点的children中是否已经在selectedItem中, 如果有则删除该节点和后代节点 否则直接插入
      const TData = this.TData
      const parentNode = TData[item.parentId]

      const isExistNode = this.selectedItem.some(item =>
        parentNode.children.includes(item)
      )

      if (isExistNode) {
        this.selectedItem = this.findAncestors(item)

        if (!this.isContainRoot) {
          this.selectedItem.shift()
        }
      }

      this.selectedItem.push(item)

      this.lastClickIdValue = item.id
      if (item.children) {
        this.departmentData = item.children
        this.isActiveDesc = true
      } else {
        // 点亮叶子节点不让`请选择部门`高亮
        this.isActiveDesc = false
      }
      this.$nextTick(() => {
        this._setSelectedContainerHeight().then(() => {
          if (!item.children) {
            const ancestors = _.cloneDeep(this.findAncestors(item))
            // 如果不存在根, 把祖先元素中的根删除
            if (!this.isContainRoot) {
              ancestors.shift()
            }

            let currentNode
            if (ancestors.every(node => `${node.id}$` !== item.id)) {
              currentNode = item
            } else {
              currentNode = ancestors.pop()
            }
            setTimeout(() => {
              this.$emit('selectDepartment', ancestors, currentNode)
            }, 20)
          }
        })
      })
    },
    findAncestors(item, saveArray = []) {
      const TData = this.TData
      const parentNode = TData[item.parentId]
      if (parentNode) {
        saveArray.unshift(parentNode)
        this.findAncestors(parentNode, saveArray)
      }
      return saveArray
    },
    _setLevel(data, level = 0) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        node.level = level
        if (node.children && node.children.length) {
          this._setLevel(node.children, level + 1)
        }
      }
    },
    _normalizeData(data) {
      const TData = this.TData
      const ret = []
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const id = node.id
        const parentId = node.parentId

        if (parentId === null) {
          ret.push(node)
        }

        if (!TData[id]) {
          TData[id] = node
        }
      }

      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const parentId = node.parentId

        if (parentId === null) continue

        if (!TData[parentId].children) {
          TData[parentId].children = []
        }
        TData[parentId].children.push(node)
      }

      return ret
    },
    // 除了root以为每个节点增加本身节点选项, 它的Id以原有的节点Id加上一个$
    _addSelfDepartment() {
      const TData = this.TData
      Object.keys(TData).forEach(key => {
        const node = TData[key]
        if (node.children && node.parentId !== null) {
          // eslint-disable-next-line
          const { children, ...selfNode } = node
          selfNode.name = `${selfNode.name}-选择当前部门`
          selfNode.parentId = selfNode.id
          selfNode.id = `${selfNode.id}$`
          node.children.unshift(selfNode)
        }
      })
    },
    _setSelectedContainerHeight() {
      return new Promise(resolve => {
        // eslint-disable-next-line
        console.log('看看这里发生了什么', this.selectedContainerMaxHeight)
        let height = 0
        const selectedScroll = this.$refs.selectedScroll
        const selectedScrollEl = selectedScroll.$el
        const departmentScroll = this.$refs.departmentScroll
        const departmentScrollEl = departmentScroll.$el
        const children = this.$refs.selectedContainer.children
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          const clientHeight = child.clientHeight
          height += clientHeight
        }

        selectedScrollEl.style.height = `${
          height <= this.selectedContainerMaxHeight
            ? height
            : this.selectedContainerMaxHeight
        }px`
        departmentScrollEl.style.height = `${
          height <= this.selectedContainerMaxHeight
            ? this.selectedContainerMaxHeight +
              this.departmentContainerMaxHeight -
              height
            : this.departmentContainerMaxHeight
        }px`

        setTimeout(() => {
          selectedScroll.refresh()
          departmentScroll.refresh()
          resolve()
        }, 20)
      })
    },
  },
  watch: {
    isShow() {
      setTimeout(() => {
        const selectedScroll = this.$refs.selectedScroll
        const departmentScroll = this.$refs.departmentScroll
        selectedScroll.refresh()
        departmentScroll.refresh()
      }, 20)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '//at.alicdn.com/t/font_1119137_gs35ef3m5zl.css'

$blue = #3C78FA

extend-click()
  position relative

  &:before
    position absolute
    top -10px
    right -10px
    bottom -10px
    left -10px
    content ''

buttonStyle()
  height 48px
  border-radius 24px
  background #FFCE55
  background-color #FFCE55
  box-shadow inset 0 0 8px 0 rgba(247,72,27,.5)
  color #FFFFFF
  text-shadow 0 2px 4px rgba(247,72,27,.5)
  letter-spacing 0
  font-size 26px
  line-height 48px !important
  line-height 38px

divider()
  border-bottom 1px solid rgba(#262630,.14)

.department-choice
  &-wrapper
    position fixed
    bottom 0
    display flex
    flex-direction column
    overflow hidden
    width 100%
    height 1182px
    border-radius 8px 8px 0 0

    .calculate-clock
      position absolute
      top 9999px
      width 448px
      height 612px

    .department-choice-header
      display flex
      justify-content space-between
      align-items center
      padding 0 40px
      height 120px
      border-bottom 1px solid rgba(#262630,.14)
      background-color #F1F1F2

      h2
        margin 0
        font-size 36px

      .close
        extend-click()
        color rgba(#262630,.45)
        font-size 40px

    .department-choice-content
      display flex
      flex 1
      flex-direction column
      background-color #ffffff

      &-top
        padding 0 40px

        .list-wrapper
          divider()

      &-bottom
        flex 1
        box-sizing border-box
        width 100%

        >>>.scroll-content
          padding 24px 0

        ul
          margin 0
          padding 0

          .department-item
            display flex
            justify-content space-between
            align-items center
            padding 24px 40px
            color #262630
            list-style none
            letter-spacing 0
            font-size 34px
            font-family PingFangSC-Regular
            line-height 46px

            &.remark
              padding 8px 40px
              color #262630
              letter-spacing 0
              font-size 26px
              font-family PingFangSC-Regular
              line-height 38px
              opacity .55

            .icon
              width 32px
              height 32px
              font-weight bold
              font-size 32px

            &.selected
              background-color #F7F7F7
              color $blue
</style>
