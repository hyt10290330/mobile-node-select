<template>
  <div
    :class="[linePattern]"
    class="step"
  >
    <div class="full-line"></div>
    <div class="half-line"></div>
    <div
      :class="{ solid: solid }"
      class="circle"
    ></div>
    <div
      :class="{ active: textActive }"
      class="step-right"
    >{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    linePattern: {
      type: String,
      default: 'half-bottom',
      // half-top half-bottom full
    },
    solid: {
      type: Boolean,
      default: false,
    },
    textActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  components: {},
  computed: {},
  methods: {},
}
</script>

<style lang="stylus" scoped>
$blue = #3C78FA
$white = #ffffff

.step
  position relative
  display flex
  align-items center
  padding 24px 0 24px 40px

  .circle
    position absolute
    top 39px
    left 0
    box-sizing border-box
    width 16px
    height 16px
    border 2px solid $blue
    border-radius 50%
    background-color $white

    &.solid
      background-color $blue

  .full-line, .half-line
    position absolute
    left 7px
    width 2px

  .full-line
    height 100%

  .half-line
    top 0
    height 47px

  &.half-top
    .full-line
      background-color $white

    .half-line
      background-color $blue

  &.half-bottom
    .full-line
      background-color $blue

    .half-line
      background-color $white

  &.full
    .full-line
      background-color $blue

    .half-line
      background-color transparent

  &-right
    background-color $white
    color #262630
    letter-spacing 0
    font-weight bold
    font-size 34px
    font-family PingFangSC-Regular
    line-height 46px

    &.active
      color $blue
</style>
