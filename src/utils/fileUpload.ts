/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getFormData (object: { [x: string]: string | number | boolean | File | Blob | undefined }, form: FormData) {
  const formData = form || new FormData()
  Object.keys(object).forEach(key => {
    const val = object[key] ? object[key] : ''
    formData.append(key, String(val))
  })
  return formData
}
