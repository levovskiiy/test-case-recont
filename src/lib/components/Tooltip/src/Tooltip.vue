<script lang="ts" setup>
import { useClickOutside } from '@/lib/composables'
import type { AnyFn } from '@/lib/types'
import { flip, offset, shift, useFloating } from '@floating-ui/vue'
import { computed, ref, useTemplateRef, type ComputedRef } from 'vue'

defineSlots<{
  trigger(
    byClick: ComputedRef<Record<string, AnyFn>>,
    byHover: ComputedRef<Record<string, AnyFn>>,
  ): any
  default(): any
}>()

const triggered = ref(false)
const tooltipRef = useTemplateRef('tooltip')
const floatRef = useTemplateRef('float')

const { floatingStyles } = useFloating(tooltipRef, floatRef, {
  transform: false,
  open: triggered,
  placement: 'bottom-start',
  middleware: [offset(10), flip(), shift()],
})

const clickHandlers = computed(() => ({
  click: () => {
    if (triggered.value) {
      close()
    } else {
      open()
    }
  },
}))

const hoverHandlers = computed(() => ({
  pointerenter: enter,
  pointerleave: leave,
}))

function open() {
  triggered.value = true
}

function close() {
  triggered.value = false
}

function enter() {
  if (!triggered.value) {
    open()
  }
}
function leave() {
  if (!triggered.value) {
    return
  }

  close()
}

useClickOutside(tooltipRef, close)
</script>

<template>
  <div ref="tooltip" class="tooltip">
    <slot name="trigger" :byClick="clickHandlers" :byHover="hoverHandlers" />
    <Transition name="tooltip">
      <div ref="float" v-show="triggered" class="float" :style="floatingStyles">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<style lang="scss" scoped>
.tooltip {
  position: relative;

  .float {
    z-index: 3;
  }
}
</style>
