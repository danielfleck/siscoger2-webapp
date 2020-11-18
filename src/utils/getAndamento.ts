type Proc = 'ipm' | 'sindicancia' | 'cd' | 'cj' | 'apfd' | 'fatd' | 'iso' | 'desercao' | 'it' | 'adl' | 'pad' | 'sai' | 'proc_outros'

export const getAndamento = (proc: Proc): number => {
  const andamento = {
    ipm: 1,
    sindicancia: 6,
    cd: 9,
    cj: 12,
    apfd: 0,
    fatd: 1,
    iso: 18,
    desercao: 0,
    it: 21,
    adl: 0,
    pad: 24,
    sai: 26,
    proc_outros: 0
  }
  return andamento[proc]
}

export const getSobrestamento = (proc: Proc): number => {
  const sobrestamento = {
    ipm: 4,
    sindicancia: 8,
    cd: 11,
    cj: 12,
    apfd: 0,
    fatd: 3,
    iso: 20,
    desercao: 0,
    it: 23,
    adl: 0,
    pad: 26,
    sai: 28,
    proc_outros: 0
  }
  return sobrestamento[proc]
}
