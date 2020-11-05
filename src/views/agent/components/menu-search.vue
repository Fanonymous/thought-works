<template>
  <div class="search">
    <tw-row :gutter="0">
      <tw-col :xl="8" :lg="8" :md="12" class="before-menu">
        <div class="menu-item" :class="{'active-menu': index === 1}" @click="handleSwitch(1)">All</div>
        <div class="menu-item" :class="{'active-menu': index === 2}" @click="handleSwitch(2)">Physical</div>
        <div class="menu-item" :class="{'active-menu': index === 3}" @click="handleSwitch(3)">Virtual</div>
      </tw-col>
      <tw-col :xl="16" :lg="16" :md="24">
        <tw-row>
          <tw-col :xl="12" :lg="24" :md="24" class="search-row">
            <tw-input>
              <template slot="prefix">
                <span class="icon-search"></span>
              </template>
            </tw-input>
          </tw-col>
          <tw-col :xl="12" :lg="1" :md="1" class="switch-card">
            <span class="icon-th-card" :class="{'active-mode': show_mode === 1}" @click="handleSwitchMode(1)"></span>
            <span class="icon-th-list" :class="{'active-mode': show_mode === 2}" @click="handleSwitchMode(2)"></span>
          </tw-col>
        </tw-row>
      </tw-col>
      <tw-col :span="24" class="after-menu">
        <div class="menu-item" :class="{'active-menu': index === 1}" @click="handleSwitch(1)">All</div>
        <div class="menu-item" :class="{'active-menu': index === 2}" @click="handleSwitch(2)">Physical</div>
        <div class="menu-item" :class="{'active-menu': index === 3}" @click="handleSwitch(3)">Virtual</div>
      </tw-col>
    </tw-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: 1,
      show_mode: 2
    }
  },
  methods: {
    handleSwitch (index) {
      this.index = index
      index === 1 && (this.$emit('menuClick', ''))
      index === 2 && (this.$emit('menuClick', 'physical'))
      index === 3 && (this.$emit('menuClick', 'virtual'))
    },
    handleSwitchMode (index) {
      this.show_mode = index
    }
  }
}
</script>
<style lang="scss" scoped>
.search{
  margin: 10px;
  background-color: #fff;
  height: 50px;
  ::v-deep .tw-row{
    height: 50px;
  }
}
.before-menu,.after-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
  .menu-item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-right: 1px solid #F1F1F1;
  }
  .active-menu{
    color: #0EB8D1;
    border-bottom: 3px solid #0EB8D1;
  }
}
.after-menu{
  display: none;
}
.search-row{
  display: flex;
  padding: 10px;
  align-items: center;
  ::v-deep .tw-input{
    flex: 1;
  }
}
.switch-card{
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  font-size: 18px;
  span{
    cursor: pointer;
  }
  .icon-th-list{
    margin-left: 10px;
  }
  .active-mode{
    color: #41C7DB;
  }
}
@media screen and (max-width: 768px) {
  .before-menu{
    display: none;
  }
  .after-menu{
    display: flex;
    margin-top: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .switch-card{
    display: none;
  }
}
</style>


