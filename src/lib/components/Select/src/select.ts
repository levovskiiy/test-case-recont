import type { ExtractPropTypes, PropType } from 'vue'

export const selectProps = {
  modelValue: {
    default: null,
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  mapKey: {
    type: Function,
    default: (it: any) => it.id,
  },
  mapTitle: {
    type: Function,
    default: (it: any) => it.title,
  },
  placeholder: {
    type: String,
    default: 'Выберите значение',
  },
  title: {
    type: String,
    default: '',
  },
}

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  'update:model-value': (key: string) => typeof key === 'string',
}

export type SelectEmits = typeof selectEmits
