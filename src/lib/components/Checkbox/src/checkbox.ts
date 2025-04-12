import type { ExtractPropTypes } from 'vue'

export const checkboxProps = {
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  value: {},
  disabled: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'label',
  },
  trueValue: {
    default: true,
  },
  falseValue: {
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmit = {
  change: (e: Event) => e instanceof Event,
}

export type CheckboxEmit = typeof checkboxEmit
