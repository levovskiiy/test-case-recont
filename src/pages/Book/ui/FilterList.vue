<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import { Input } from '@/lib/components'
import Checkbox from '@/lib/components/Checkbox/src/Checkbox.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<{ id: string; title: string }[]>,
    default: () => [],
  },
})

const selected = defineModel('modelValue', {
  type: Array,
})

const query = ref('')

const filteredNodes = computed(() => {
  return props.items.filter((it) => it.title.toLowerCase().includes(query.value.toLowerCase()))
})
</script>

<template>
  <div class="filter-list">
    <div class="header">
      <div class="text-leading">{{ title }}</div>
      <div class="text-leading text-color-placeholder">{{ props.items.length }}</div>
      <button class="button no-border small text-color-placeholder" @click="selected?.splice(0)">
        Очистить
      </button>
    </div>
    <Input v-model="query" class="query-search" placeholder="Введите значение..." />
    <div v-if="filteredNodes.length > 0" class="checkbox-list">
      <Checkbox
        v-for="it in filteredNodes"
        :key="it.id"
        v-model="selected"
        :label="it.title"
        :value="it.id"
      />
    </div>
    <div v-else class="text-base text-color-placeholder">Ничего не найдено</div>
  </div>
</template>

<style lang="scss" scoped>
.filter-list {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  border: 2px solid rgba(245, 246, 246, 1);
  border-radius: 16px;
  padding: 12px;

  .header {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    .button {
      margin-left: auto;
    }
  }

  .checkbox-list {
    height: 200px;
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    overflow: auto;
  }

  .wrapper {
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;
    border-radius: 16px;
    background: #fff;
    border: 2px solid rgba(245, 246, 246, 1);
    padding: 16px;
  }

  .query-search {
    width: 100%;
  }

  .list {
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
