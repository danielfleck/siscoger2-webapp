import { opms } from 'src/config'
export const getOpmByCode = (cdopm: string | number | undefined): string => {
  if (!cdopm) return 'Não cadastrada'
  const opm = opms.filter((opm) => opm.value === cdopm)
  if (!opm.length) return 'Não encontrada'
  return opm[0].label
}
