<template>
  <button
    class="tw-button"
    @click="handleClick"
    :disabled="disabled"
    :class="[]"
  >
    <slot></slot>
  </button>
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
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
