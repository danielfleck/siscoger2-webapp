/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
export interface Columns {
  name: string
  label: string
  field: string | Function
  required?: boolean
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  sort?: Function
  format?: (val: any, row: object) => any
  style?: string
  classes?: string
  headerStyle?: string
  headerClasses?: string
}
