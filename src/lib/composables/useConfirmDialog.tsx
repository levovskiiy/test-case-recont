import { createApp, defineComponent, ref } from 'vue'
import Dialog from '../components/Dialog/src/Dialog.vue'

export type UseConfirmDialogResolver<Confirm = any, Reject = any> =
  | {
      data?: Confirm
      canceled: false
    }
  | {
      data?: Reject
      canceled: true
    }

export function useConfirmDialog<ConfirmData = any, CancelData = any>() {
  const opened = ref(false)

  let _resolve: (arg: UseConfirmDialogResolver<ConfirmData, CancelData>) => void = () => {}

  function open() {
    opened.value = true

    return new Promise<UseConfirmDialogResolver<ConfirmData, CancelData>>((resolve) => {
      _resolve = resolve
    })
  }

  function confirm(data?: ConfirmData) {
    opened.value = false
    _resolve({ data, canceled: false })
  }

  function cancel(data?: CancelData) {
    opened.value = false
    _resolve({ data, canceled: true })
  }

  return {
    opened,
    confirm,
    cancel,
    open,
  }
}

export type ConfirmDialogProps = {
  title: string
  text: string
  accept?: string
  cancel?: string
}

export function useConfirm(opts: ConfirmDialogProps) {
  const confirm = useConfirmDialog()
  const component = defineComponent({
    setup() {
      return () => (
        <Dialog visible={confirm.opened.value} title={opts.title} onClose={confirm.cancel}>
          {{
            default: () => <div class="text-base">{opts.text}</div>,
            footer: () => [
              <button class="button primary" onClick={() => confirm.cancel()}>
                {opts.cancel || 'Отмена'}
              </button>,
              <button class="button no-border" onClick={() => confirm.confirm()}>
                {opts.accept || 'Подтвердить'}
              </button>,
            ],
          }}
        </Dialog>
      )
    },
  })

  const app = createApp(component)
  const wrapper = document.createElement('div')
  document.body.appendChild(wrapper)
  app.mount(wrapper)

  return confirm.open().finally(() => {
    app.unmount()
    wrapper.remove()
  })
}
