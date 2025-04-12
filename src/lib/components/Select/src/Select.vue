<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useClickOutside, useKeyPress } from '@/lib/composables'
import { flip, offset, shift, useFloating } from '@floating-ui/vue'
import { selectEmits, selectProps } from './select'

const UPDATE_SELECTED_VALUE_EVENT = 'update:model-value'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const innerOptions = computed(() =>
  props.options.map((it) => ({
    ...it,
    key: props.mapKey(it),
    title: props.mapTitle(it),
  })),
)

const innerOptionsMap = computed<Record<string, any>>(() => {
  const result: any = {}

  for (const item of innerOptions.value) {
    result[item.key] = item
  }

  return result
})

const selectedItem = computed(() => {
  if (props.modelValue == null) {
    return null
  }
  return innerOptionsMap.value[props.modelValue]
})

const opened = ref(false)
const rootRef = useTemplateRef('root')
const menuRef = useTemplateRef('menu')
const { floatingStyles, update } = useFloating(rootRef, menuRef, {
  transform: false,
  placement: 'bottom-start',
  middleware: [offset(5), flip(), shift()],
})

function close() {
  if (!opened.value) {
    return
  }

  opened.value = false
}

function toggle() {
  opened.value = !opened.value
  if (opened.value) {
    update()
  }
}

function selectItem(it: any) {
  emit(UPDATE_SELECTED_VALUE_EVENT, it.key)
  close()
}

useKeyPress(['Tab', 'Escape'], close)
useClickOutside(rootRef, close)
</script>

<template>
  <div ref="root" class="select" :class="{ opened }">
    <div class="selected-value" @click="toggle">
      <div class="value">
        <div v-if="selectedItem != null" class="present">
          <span v-if="title" class="text-base label">{{ title }}</span>
          <span class="text-bold">{{ selectedItem.title }}</span>
        </div>
        <div v-else class="placehodler">Выбирите опцию</div>
      </div>
    </div>
    <Transition name="select">
      <div ref="menu" v-show="opened" class="option-dialog" :style="floatingStyles">
        <div
          v-for="it in innerOptions"
          :key="it.key"
          class="option text-base"
          :class="{ selected: modelValue === it.key }"
          @click="selectItem(it)"
        >
          {{ it.title }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.select-enter-active,
.select-leave-active {
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<style lang="scss" scoped>
.select {
  min-width: 140px;
  position: relative;
  cursor: pointer;
  color: rgba(112, 119, 134, 1);
  font-size: 12px;
  border-radius: 8px;

  &.opened {
    background: rgba(245, 246, 246, 1);
  }

  .selected-value {
    box-sizing: border-box;
    min-height: 40px;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    vertical-align: middle;
    background: none;
    transition: all 0.2s;
    padding: 12px;
    border-radius: 8px;

    &:hover {
      background: rgba(245, 246, 246, 1);
    }

    .value {
      flex: auto;

      .present .label {
        margin-right: 4px;

        &::after {
          display: inline-block;
          content: ':';
        }
      }
    }
  }

  .option-dialog {
    z-index: 2;
    box-sizing: border-box;
    background: #fff;
    min-width: 260px;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 8px;
    padding: 12px 0;
    box-shadow:
      0px 0px 8px rgba(28, 41, 61, 0.05),
      0px 2px 4px rgba(28, 41, 61, 0.06);

    .option {
      box-sizing: border-box;
      padding: 12px;

      &:hover:not(.selected) {
        background-color: rgba(245, 246, 246, 1);
      }

      &.selected {
        background: rgba(221, 223, 228, 1);
      }
    }
  }
}
</style>
