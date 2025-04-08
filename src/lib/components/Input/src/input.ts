import type { ExtractPropTypes } from 'vue'

export const inputProps = {
  modelValue: {
    type: String,
    default: '',
  },
  placehodler: {
    type: String,
  },
  error: {
    type: Boolean,
    default: false,
  },
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:model-value': (value: string) => typeof value === 'string',
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
}

export type InputEmits = typeof inputEmits
