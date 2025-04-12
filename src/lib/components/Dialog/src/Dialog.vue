<script setup lang="ts">
import { IconClose } from '@/lib/icons'
import { useKeyPress } from '@/lib/composables'
import { dialogEmits, dialogProps } from './dialog.ts'

defineOptions({
  inheritAttrs: false,
})

defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

function close() {
  emit('update:visible', false)
  emit('close')
}

useKeyPress(['Escape'], close)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-show="visible" class="dialog-viewport" @click="close">
        <div class="overlay-dialog">
          <div ref="dialog" v-bind="$attrs" class="dialog" :class="{ fullscreen }" @click.stop>
            <header class="header">
              <slot name="header">
                <div class="wrapper">
                  <div class="text-heading">
                    {{ title }}
                  </div>
                  <button class="button no-border small close" @click="close">
                    <IconClose />
                  </button>
                </div>
                <div v-if="description" class="text-base text-color-placeholder desc">
                  {{ description }}
                </div>
              </slot>
            </header>
            <div class="body">
              <slot />
            </div>
            <footer class="footer">
              <slot name="footer" />
            </footer>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .overlay-dialog,
.fade-leave-active .overlay-dialog {
  transition: all 0.2s;
}

.fade-enter-from .overlay-dialog,
.fade-leave-to .overlay-dialog {
  opacity: 0;
  transform: scale(95%);
}
</style>

<style lang="scss" scoped>
.dialog-viewport {
  position: fixed;
  inset: 0;
  height: 100%;
  z-index: 1000;
  background: rgba(16, 24, 40, 0.1);
  overflow: auto;

  .overlay-dialog {
    position: fixed;
    inset: 0;
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialog {
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-flow: column nowrap;
    gap: 32px;
    border-radius: 16px;
    overflow: auto;

    &.fullscreen {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

    .header {
      padding: 32px 32px 0 32px;
      display: flex;
      flex-flow: column nowrap;

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .desc {
        margin-top: 8px;
      }

      .close {
        align-self: flex-start;
      }
    }

    .body {
      padding: 0 32px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      padding: 0 32px 32px 32px;
    }
  }
}
</style>
