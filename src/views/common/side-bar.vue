<template>
  <div class="sider-bar">
    <div class="tw-menu">
      <div class="close-btn" @click="closeMenu">
        <span class="icon-close"></span>
      </div>
      <div v-for="item in menu_list" :key="item.id" class="menu-item" :class="{'active-menu': item.url === $route.name}" @click="routerLink(item)">
        <span class="menu-icon" :class="[item.icon]"></span>
        <span class="nemu-lable">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('common', ['menu_list'])
  },
  methods: {
    ...mapMutations('common', ['SET_SIDEBAR_FOLD']),
    routerLink (item) {
      if (item.url && this.$route.name !== item.url) {
        this.$router.push({
          name: item.url
        })
      }
    },
    closeMenu () {
      this.SET_SIDEBAR_FOLD(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.sider-bar{
  width: $side-bar-height;
}
.tw-menu{
  position: fixed;
  top: 60px;
  bottom: 0;
  width: $side-bar-height;
  background-color: #2D4054;
  .menu-item{
    color: #B1B7BE;
    font-size: 20px;
    padding: 20px 0 20px 20px;
    cursor: pointer;
    &:hover{
      background-color: #1e5690;
    }
    .nemu-lable{
      padding-left: 16px;
    }
  }
  .active-menu{
    color: #26798F;
  }
}
.close-btn{
  position: absolute;
  display: none;
  top: 10px;
  right: 10px;
  color: #59CDDF;
  z-index: 1000;
}
@media screen and (max-width: 1024px) {
  .tw-menu{
    top: 0 !important;
    z-index: 999;
  }
  .close-btn{
    display: block !important;
  }
}
</style>
