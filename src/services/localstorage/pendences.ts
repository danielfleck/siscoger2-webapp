import { LocalStorage } from 'quasar'
import { Pendencia } from 'src/types'

interface PendenceStore {
  data: Pendencia[]
  length: number
  lastUpdate: Date
}
// const defaultValue: PendenceStore = {
//   data: [],
//   length: 0,
//   lastUpdate: new Date()
// }
export const getPendence = (nameStore: string):PendenceStore | null => LocalStorage.getItem(nameStore) // || defaultValue
