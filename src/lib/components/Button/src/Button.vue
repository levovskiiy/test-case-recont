<script lang="ts" setup>
import { computed } from 'vue'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const classes = computed(() => [
  'button',
  {
    disabled: props.disabled,
  },
  props.visual,
])
</script>

<template>
  <component :is="props.tag" :class="classes" :disabled="disabled" @click="emit('click', $event)">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  user-select: none;
  border: none;
  outline: none;
}
</style>
