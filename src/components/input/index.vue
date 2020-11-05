<template>
  <div class="tw-input">
    <div class="prefix">
      <slot name="prefix"></slot>
    </div>
    <input :value="value" type="text" :placeholder="placeholder" class="input" @input="handleInput">
  </div>
</template>
<script>
export default {
  name: 'TwInput',
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.tw-input{
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
  .prefix{
    padding-left: 5px;
  }
  .input{
    flex: 1;
    width: 0;
    border: 0;
    height: 26px;
    line-height: 26px;
    color: #606266;
    outline: none;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    padding: 0 10px;
    border-radius: 4px;
  }
}
</style>


