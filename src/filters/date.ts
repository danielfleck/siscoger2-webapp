export type Locales = 'pt-br' | 'en' | 'fr-ca'

export const changeDate = (dateString: string, locale: Locales, extensive = false) => {
  if (!dateString) return ''
  if (['/'].indexOf(dateString)) {
    dateString = dateString.split('/').reverse().join('-')
  }

  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    return date.toLocaleDateString(locale, options)
  }

  return date.toLocaleDateString(locale, { ...options, month: 'numeric' })
}

export const getCurrentDate = (locale: Locales, extensive = false) => {
  const date = new Date()

  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    return date.toLocaleDateString(locale, options)
  }

  return date.toLocaleDateString(locale, { ...options, month: 'numeric' })
}
