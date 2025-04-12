<script lang="ts" setup>
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useAttrs as useExcludedAttrs } from '@/lib/composables'
import { inputEmits, inputProps } from './input'

defineOptions({
  inheritAttrs: false,
})

defineSlots<{
  left(): any
  right(): any
}>()

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const focused = ref(false)

const allAttrs = useAttrs()
const inputAttrs = useExcludedAttrs()

const slots = useSlots()

const containerCls = computed(() => [
  {
    grouped: !!slots.left || !!slots.right,
    'grouped-left': !!slots.left,
    'grouped-righ': !!slots.righ,
    focused: focused.value,
    error: props.error,
  },
  allAttrs.class,
])

function onFocus(e: FocusEvent) {
  focused.value = true
  emit('focus', e)
}

function onBlur(e: FocusEvent) {
  focused.value = false
  emit('blur', e)
}

function onInput(event: Event) {
  const { value } = event.target as HTMLInputElement
  emit('update:model-value', value)
}
</script>

<template>
  <div class="input" :class="containerCls">
    <div v-if="slots.left" class="left-group">
      <slot name="left" />
    </div>
    <div class="input-wrapper">
      <input
        ref="input"
        v-bind="inputAttrs"
        :value="modelValue"
        :placeholder="placeholder"
        class="input-field"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </div>
    <div v-if="slots.right" class="right-group">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  min-height: 40px;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 100%;
  vertical-align: middle;
  background: rgba(245, 246, 246, 1);
  transition: all 0.2s;

  border-radius: 8px;

  &.grouped {
    &.grouped-left .input-wrapper {
      padding-left: 4px;
    }

    &.grouped-right .input-wrapper {
      padding-right: 4px;
    }
  }

  &.focused {
    box-shadow: 0 0 0 2px rgb(var(--primary-color-token)) inset;
  }

  &.error {
    box-shadow: 0 0 0 2px rgb(var(--error-color-token)) inset;
  }

  .left-group,
  .right-group {
    padding-left: 12px;
    display: inline-flex;
    align-items: center;
  }

  .input-wrapper {
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    width: 100%;
    box-sizing: border-box;
    outline: 0 none;

    .input-field {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      flex-grow: 1;
      padding: 0;
      border: none;
      outline: none;
      background: none;
      box-shadow: none;

      &::placeholder {
        color: rgba(112, 119, 134, 1);
      }
    }
  }
}
</style>
