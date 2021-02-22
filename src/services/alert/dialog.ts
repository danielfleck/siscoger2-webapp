
export const confirmMsg = {
  title: 'Atenção!',
  message: 'você tem certeza?',
  cancel: true,
  persistent: true
}
interface Msg {
  title?: string,
  message?: string,
  cancel?: boolean,
  persistent?: boolean
}

const defaultMsg = {
  title: 'Atenção!',
  message: 'você tem certeza?',
  cancel: true,
  persistent: true
}

export const confirm = ({ title, message, cancel, persistent }: Msg = defaultMsg) => ({
  title,
  message,
  cancel,
  persistent
})
