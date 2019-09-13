<template>
  <div
    class="popup"
    v-show="isShow"
  >
    <transition name="bg">
      <div
        @click="onTouchBg"
        class="popup-bg"
        v-show="isShow"
      ></div>
    </transition>

    <transition
      @after-enter="afterEnter"
      name="content"
    >
      <div
        class="popup-content"
        v-show="isShow"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onTouchBg() {
      this.$emit('touchBg')
    },
    afterEnter() {
      this.$emit('end')
    },
  },
}
</script>

<style lang="stylus">
.popup
  position fixed
  top 0
  left 0
  z-index 100
  width 100%
  height 100%

  &-bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0,0,0,.4)

.bg-enter-active, .content-enter-active, .bg-leave-active, .content-leave-active
  transition all .3s ease

.bg-enter, .bg-leave-to
  opacity 0

.content-enter, .content-leave-to
  top -35%
</style>
