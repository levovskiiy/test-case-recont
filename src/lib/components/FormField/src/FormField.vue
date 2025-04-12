<script setup lang="ts">
import { formFieldProps } from './formField'

defineProps(formFieldProps)
</script>

<template>
  <div class="form-field" :class="{ error }">
    <div class="text-bold">{{ title }}</div>
    <div class="value">
      <slot />
    </div>
    <span v-if="$slots.description" class="text-note description">
      <slot name="description" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.form-field {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  &.error .description {
    color: rgba(144, 11, 9, 1);
  }
}
</style>
