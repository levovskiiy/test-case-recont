import type { ExtractPropTypes } from 'vue'

export const formFieldProps = {
  title: {
    type: String,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
}

export type FormFieldProps = ExtractPropTypes<typeof formFieldProps>
