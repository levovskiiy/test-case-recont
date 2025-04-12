<script lang="ts" setup>
import { computed, toRaw } from 'vue'
import { checkboxEmit, checkboxProps } from './checkbox'

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmit)
const model = defineModel('modelValue')

const checkedStatus = computed(() => {
  if (typeof model.value === 'boolean') {
    return model.value
  } else if (Array.isArray(model.value)) {
    // не добавил поддержку объектов
    return model.value.map(toRaw).includes(props.value)
  } else if (model.value != null) {
    return model.value === props.trueValue || model.value === props.falseValue
  }

  return !!model.value
})
</script>

<template>
  <label class="checkbox">
    <span class="input" :class="{ checked: checkedStatus }">
      <input
        v-model="model"
        type="checkbox"
        :name="name"
        :value="value"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="disabled"
        @change="emit('change', $event)"
        class="input-original"
      />
      <span class="checkbox-inner"></span>
    </span>
    <span class="label text-color-placeholder">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  height: 40px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  .input {
    position: relative;
    display: inline-flex;
    white-space: nowrap;
    cursor: pointer;
    outline: none;

    &-original {
      display: none;
    }

    &.checked {
      .checkbox-inner {
        background-color: var(--primary-color);
        border-color: var(--primary-color);

        &::after {
          transform: rotate(45deg) scaleY(1);
          border-color: #fff;
        }
      }
    }

    .checkbox-inner {
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      border-radius: 2px;
      display: inline-block;
      position: relative;
      border: 2px solid rgba(112, 119, 134, 1);
      transition:
        border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        outline 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

      &::after {
        content: '';
        position: absolute;
        top: 1px;
        left: 4px;
        box-sizing: content-box;
        width: 3px;
        height: 7px;
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        transform: rotate(45deg) scaleY(0);
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }

      &:hover {
        border-color: var(--primary-color);
      }
    }
  }

  .label {
    margin-left: 8px;
  }
}
</style>
