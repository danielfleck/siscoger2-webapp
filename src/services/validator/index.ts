/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { errorNotify } from '../alert/notify'

export function validate (refs: any, fields: string[], debug = false):boolean {
  const valid = fields.reduce((prevVal, field: string | number) => {
    const hasField = Boolean(refs[field])
    const validated = hasField ? refs[field].validate() : true

    if (debug) {
      console.log(`Reference of ${field} is ${Boolean(refs[field])}`)
      // console.log(`prevVal is ${prevVal} and this field is ${validated}`)
    }
    return prevVal && validated
  }, true)
  if (debug) console.log('Validation is:', valid)
  if (!valid) errorNotify('Erros no formulário!')
  return valid
}

export function resetValidation (refs: any, fields: string[]) {
  fields.map(f => {
    if (refs[f]) refs[f].resetValidation()
  })
  return true
}
