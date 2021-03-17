interface ToLocaleDateString {
  year?: 'numeric';
  month?: 'long' | 'short' | 'numeric';
  weekday?: 'long' | 'short';
  day?: 'numeric';
  hour?: 'numeric';
  minute?: 'numeric';
  second?: 'numeric';
  era?: 'long' | 'short';
  timeZoneName?: 'long' | 'short';
}

export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
export const getCurrentDate = (extensive = false) => {
  const date = new Date()
  const options: ToLocaleDateString = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    return date.toLocaleDateString('pt-br', options)
  }

  return date.toLocaleDateString('pt-br', { ...options, month: 'numeric' })
}
