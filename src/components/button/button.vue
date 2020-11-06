<template>
  <div class="button">
    <div class="button-inner" :class="[`tw-button-${type}`]">
      <span v-if="prefix" class="prefix" :class="[prefix]"></span>
      <slot></slot>
      <span v-if="suffix" class="suffix" :class="[suffix]"></span>
      <span v-if="onlyIcon" class="only-icon" :class="[onlyIcon]"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TwButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    prefix: {
      type: String
    },
    suffix: {
      type: String
    },
    onlyIcon: {
      type: String
    }
  },
}
</script>
<style lang="scss" scoped>
.button{
  display: inline-block;
}
.button-inner{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 30px;
  padding: 0 10px;
  margin-right: 10px;
  cursor: pointer;
}
.tw-button-default{
  background-color: #EFEFEF;
  color:#324558;
  &:hover{
    background-color: #e1e4e6;
  }
}
.tw-button-primary{
  background-color:#00B4CF;
  color: #fff;
  &:hover{
    background-color: #01869A;
  }
}
.tw-button-warning{
  background-color: #435466;
  color: #fff;
  &:hover{
    background-color: #2D4054;
  }
}
.prefix{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-right: 5px;
}
.suffix{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #425465;
  margin-left: 5px;
}
.only-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>

