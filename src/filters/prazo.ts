/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPrazoDecorrido (val: string, row: any): string {
  if (!val) return '-'
  if (!row?.abertura_data) return 'S/Data abertura'
  return `${val} Dias`
}
