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
      <div class="history">
        <div class="label">History</div>
        <div class="content">
          <div v-for="item in history" :key="item.id" class="history-item">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      history: []
    }
  },
  computed: {
    ...mapState('common', ['menu_list'])
  },
  created () {
    this.initHistory()
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
    },
    initHistory () {
      let i = 1
      while (i < 14) {
        this.history.push({
          id: i,
          content: `bjstdmngbgr${ i }/Acceptance_test`
        })
        i ++
      }
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
    font-size: 18px;
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    &:hover{
      color: #00b4cf;
    }
    .nemu-lable{
      padding-left: 16px;
    }
  }
  .active-menu{
    color: #26798F;
  }
  .history{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    .label{
      font-size: 24px;
      color: #ccc;
    }
    .content{
      font-size: 12px;
      color: #999;
      margin-top: 6px;;
    }
    .history-item{
      cursor: pointer;
      padding: 5px 0;
      &::before{
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #999;
        vertical-align: middle;
        margin-right: 12px;
        border-radius: 4px;
      }
      &:hover{
        color: #00b4cf;
      }
    }
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
