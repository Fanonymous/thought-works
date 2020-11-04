<template>
  <div class="layout-content">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.layout-content{
  max-width: 1200px;
}
.router-fade-enter-active,.router-fade-leave-active {
  transition: opacity 0.5s;
}
.router-fade-enter,.router-fade-leave-active {
  opacity: 0;
}
</style>
