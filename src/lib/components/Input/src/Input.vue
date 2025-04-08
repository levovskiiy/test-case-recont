<script lang="ts" setup>
import { computed, ref, useAttrs, useTemplateRef } from 'vue'
import { useAttrs as useExcludedAttrs } from '@/lib/composables'
import { inputEmits, inputProps } from './input'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const focused = ref(false)
const inputRef = useTemplateRef('input')

const allAttrs = useAttrs()
const inputAttrs = useExcludedAttrs()
const containerCls = computed(() => [
  {
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
  <div class="input">
    <slot name="left" />
    <div class="input-wrapper" @click.stop="inputRef?.focus()" :class="containerCls">
      <input
        ref="input"
        v-bind="inputAttrs"
        :value="modelValue"
        :placeholder="placehodler"
        class="input-field"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </div>
    <slot name="right" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  --default-color: 28, 125, 65;
  --error-color: 144, 11, 9;

  min-height: 40px;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 100%;
  vertical-align: middle;

  .input-wrapper {
    padding: 10px 12px;
    border-radius: 8px;
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    transition: all 0.2s;
    background: rgba(245, 246, 246, 1);

    &.focused {
      background: rgba(var(--default-color), 0.05);
      box-shadow: 0 0 0 2px rgb(var(--default-color)) inset;
    }

    &.error {
      background: rgba(var(--error-color), 0.05);
      box-shadow: 0 0 0 2px rgb(var(--error-color)) inset;
    }

    .input-field {
      box-sizing: border-box;
      width: 100%;
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
