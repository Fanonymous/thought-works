<template>
  <div class="header-bar">
    <div class="header-fixed">
      <div class="menu-btn" @click="show">
        <span class="icon-navicon"></span>
      </div>
      <div class="logo">
        <svg-icon class="logo-svg" icon-class="logo"></svg-icon>
      </div>
      <div class="avatar">
        <tw-popover>
          <div class="avatar-placement">
            <img class="avatar-img" src="~assets/img/avatar.jpg" alt="avatar">
            <span class="icon-angle-down"></span>
          </div>
          <template slot="content">
            <div class="dropdown">
              <div class="dropdown-item">
                <span class="icon-id-card"></span>
                <span class="dropdown-item__content">Profile</span>
              </div>
              <div class="dropdown-item">
                <span class="icon-sign-in"></span>
                <span class="dropdown-item__content">Sign Out</span>
              </div>
            </div>
          </template>
        </tw-popover>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('common', ['sidebar_fold'])
  },
  methods: {
    ...mapMutations('common', ['SET_SIDEBAR_FOLD']),
    // 控制侧边菜单
    show () {
      this.SET_SIDEBAR_FOLD(!this.sidebar_fold)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-bar{
  height: $header-height;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
}
.header-fixed{
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #fff;
  .menu-btn{
    position: absolute;
    left: 20px;
    top: 20px;
    display: none;
    font-size: 20px;
  }
  .logo{
    .logo-svg{
      display: block;
      width: 90px;
      height: $header-height;
    }
  }
  .avatar{
    position: absolute;
    right: 20px;
    top: 10px;
    display: flex;
    align-items: center;
    z-index: 99;
    .avatar-placement{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .avatar-img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .icon-angle-down{
      font-size: 18px;
      padding-left: 6px;
    }
  }
}
.dropdown{
  padding: 10px 0;
  &-item{
    padding: 8px 12px;
    color: #2D4050;
    cursor: pointer;
    &__content{
      padding-left: 8px;
    }
    &:hover{
      background-color: #efefef;
    }
  }
}
@media screen and (max-width: 1024px) {
  .menu-btn{
    display: block !important;
  }
}
</style>