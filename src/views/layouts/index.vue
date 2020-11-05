<template>
  <div class="layout-content">
    <header-bar class="layout-header"></header-bar>
    <div class="main">
      <side-bar v-if="sidebar_fold"></side-bar>
      <div class="content">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive" />
        </transition>
      </div>
    </div>
    <tw-footer></tw-footer>
  </div>
</template>
<script>
import headerBar from '@/views/common/header-bar'
import sideBar from '@/views/common/side-bar'
import TwFooter from '@/views/common/footer'
import { mapState } from 'vuex'
export default {
  components: { headerBar, sideBar, TwFooter },
  computed: {
    ...mapState('common', ['sidebar_fold'])
  }
}
</script>

<style lang="scss" scoped>
.layout-header{
  z-index: 99;
}
.main{
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  .content{
    padding-top: $header-height;
    padding-left: $side-bar-height;
    z-index: 0;
  }
}
.router-fade-enter-active,.router-fade-leave-active {
  transition: opacity 0.5s;
}
.router-fade-enter,.router-fade-leave-active {
  opacity: 0;
}
@media screen and (max-width: 1024px) {
  .layout-side{
    display: none;
  }
  .content{
    padding-left: 0 !important;
  }
}
</style>
