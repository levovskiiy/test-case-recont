import type { Component, ExtractPropTypes, PropType } from 'vue'

export const buttonProps = {
  visual: {
    type: String as PropType<'primary' | 'error'>,
    default: 'primary',
  },
  tag: {
    type: [String, Object] as PropType<string | Component>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits
