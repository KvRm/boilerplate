import { Dialog } from 'quasar'

export interface CreateDialogOptions {
  title?: string
  message?: string
  onOk?: () => Promise<unknown> | unknown
  onCancel?: () => Promise<unknown> | unknown
}

export const isDialogSubmitting = ref(false)

export function createDialog(options: CreateDialogOptions) {
  const { message, title, onCancel, onOk } = options

  Dialog.create({
    title,
    message,
    cancel: {
      label: 'Отменить',
      flat: true,
    },
    ok: {
      label: 'Подтвердить',
      flat: true,
    },
  })
    .onOk(async () => {
      isDialogSubmitting.value = true
      await onOk?.()
      isDialogSubmitting.value = false
    })
    .onCancel(async () => await onCancel?.())
}
