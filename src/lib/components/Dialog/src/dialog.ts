export const dialogProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  fullscreen: {
    type: Boolean,
    deafult: false,
  },
}

export const dialogEmits = {
  close: () => true,
  open: () => true,
  'update:visible': (value: boolean) => typeof value === 'boolean',
}
