<template>
  <div ref='popover' class="tw-popover">
    <transition name='fade'>
      <div 
        v-if="init"
        ref='content'
        v-show='show'
        class="tw-popover__content"
        :class="[options.direction, customerClass]"
        :style="{ top: `${ top }px`, left: `${ left }px` }"
      >
        <div class="tw-popover__box">
          <slot name="content"> 请输入内容</slot>
        </div>
      </div>
    </transition>
    <slot />
  </div>
</template>

<script>
import { on, off } from '../utils/tools'
import { getPopoverPosition } from '../utils/popper'
export default {
  name: 'TwPopover',
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['click', 'hover'].indexOf(value) > -1
    },
    placement: {
      type: String,
      default: 'bottom-middle',
      validator (value) {
        const dator = /^(top|bottom|left|right)(-start|-end|-middle)?$/g.test(value)
        return dator
      }
    },
    customerClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      time: '',
      top: 0,
      left: 0,
      init: false,
      show: false,
      options: {}
    }
  },
  methods: {
    handlClick () {
      // 兼容滚动消除
      this.init = true
      if (this.$refs.content && this.$refs.content.style.display === 'none') {
        this.$refs.content.style.display = 'block'
        this.show = true
      } else {
        this.show = !this.show
      }
      // 点击之外关闭
      this.show && document.addEventListener('click', this.close)
    },
    close (e) {
      if (this.isPopover(e)) {
        this.show = false
        document.removeEventListener("click", this.close)
      }
    },
    isPopover (e) {
      if (!e) {
        return true
      } else {
        let dom = e.target
        let popover = this.$refs.popover
        let content = this.$refs.content
        if (popover.contains(dom) || content.contains(dom)) {
          if (dom.id === 'close-popover' || dom.parentNode.id === 'close-popover') {
            return true
          }
          return false
        }
        return true
      }
    },

    // 移入
    handleMouseEnter() {
      clearTimeout(this.time)
      this.init = true
      this.show = true
    },
    // 移出
    handleMouseLeave() {
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        this.show = false
      }, 200)
    }
  },
  watch: {
    init () {
      this.$nextTick(() => {
        const trigger = this.trigger
        const content = this.$refs.content
        document.body.appendChild(content)
        if (trigger === 'hover') {
          on(content, 'mouseenter', this.handleMouseEnter)
          on(content, 'mouseleave', this.handleMouseLeave)
        }
      })
    },
    show() {
      if (this.show) {
        this.$nextTick(() => {
          const { popover, content } = this.$refs
          const { left, top, options } = getPopoverPosition(popover, content, this.placement)
          this.left = left - 5
          this.top = top + 3
          this.options = options
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const trigger = this.trigger
      const popover = this.$refs.popover
      if (trigger === 'hover') {
        on(popover, 'mouseenter', this.handleMouseEnter)
        on(popover, 'mouseleave', this.handleMouseLeave)
      } else if (trigger === 'click') {
        on(popover, 'click', this.handlClick)
      }
    })
  },
  beforeDestroy() {
    const { popover, content } = this.$refs
    off(content, 'mouseleave', this.handleMouseLeave)
    off(popover, 'mouseleave', this.handleMouseLeave)
    off(content, 'mouseenter', this.handleMouseEnter)
    off(popover, 'mouseenter', this.handleMouseEnter)
    off(document, 'click', this.close)
    if (document.body.contains(content)) {
      document.body.removeChild(content)
    }
  }
};
</script>
<style lang="scss" scoped>
@import './index';
</style>

