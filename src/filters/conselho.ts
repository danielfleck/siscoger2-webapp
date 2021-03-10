import { motivoAberturaAdl } from 'src/config'

export const getMotivoConselho = (id: string | number | undefined): string => {
  console.log(id)
  if (!id) return 'Não encontrada'
  const motivo = motivoAberturaAdl.filter(({ value }) => value === id)
  if (!motivo.length) return 'Não encontrada'
  return motivo[0].label
}

export const getDecorrenciaConselho = (id: string | number | undefined): string => {
  console.log(id)
  return 'TODO'
  // if (!cdopm) return 'Não cadastrada'
  // const opm = opms.filter((opm) => opm.value === cdopm)
  // if (!opm.length) return 'Não encontrada'
  // return opm[0].label
}

export const getSituacaoConselho = (id: string | number | undefined): string => {
  console.log(id)
  return 'TODO'
  // if (!cdopm) return 'Não cadastrada'
  // const opm = opms.filter((opm) => opm.value === cdopm)
  // if (!opm.length) return 'Não encontrada'
  // return opm[0].label
}
