export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
export const getCurrentDate = (extensive = false) => {
  const date = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  if (extensive) {
    return date.toLocaleDateString('pt-br', options)
  }

  return date.toLocaleDateString('pt-br', { ...options, month: 'numeric' })
}
