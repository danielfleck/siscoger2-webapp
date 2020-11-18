export type Locales = 'pt-br' | 'en' | 'fr-ca'

export const changeDate = (dateString: string, locale: Locales, { extensive = false, debug = false } = {}) => {
  if (debug) console.log({ dateString })
  if (!dateString) return ''
  if (['/'].indexOf(dateString)) {
    dateString = dateString.split('/').reverse().join('-')
  }

  let date = new Date(dateString)
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000) // without that he returns one day less
  if (debug) console.log({ date })
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    const extensiveDate = date.toLocaleDateString(locale, options)
    if (debug) console.log({ extensiveDate })
    return extensiveDate
  }

  const returnDate = date.toLocaleDateString(locale, { ...options, month: 'numeric' })
  if (debug) console.log({ returnDate })
  return returnDate
}

export const getCurrentDate = (locale: Locales, extensive = false) => {
  const date = new Date()

  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    return date.toLocaleDateString(locale, options)
  }

  return date.toLocaleDateString(locale, { ...options, month: 'numeric' })
}
