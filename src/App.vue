<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      screen_width: document.body.offsetWidth
    }
  },
  computed: {
    ...mapState('common', ['sidebar_fold'])
  },
  mounted () {
    // 监听窗口变化
    const that = this
    window.onresize = () => {
      return (() => {
        that.screen_width = document.body.offsetWidth
        if (this.screen_width >= 1180) {
          that.SET_SIDEBAR_FOLD(true)
        } else {
          that.SET_SIDEBAR_FOLD(false)
        }
      })()
    }
    if (this.screen_width >= 1180) {
      that.SET_SIDEBAR_FOLD(true)
    } else {
      that.SET_SIDEBAR_FOLD(false)
    }
  },
  methods: {
    ...mapMutations('common', ['SET_SIDEBAR_FOLD'])
  }
}
</script>