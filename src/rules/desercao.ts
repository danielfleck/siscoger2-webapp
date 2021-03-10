import { RequiredFields, Rules } from './'

export const desercaoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-desercao', 'ver-desercao' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-desercao' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-desercao' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-desercao' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-desercao' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-desercao' */],
    roles: []
  }
}

export const desercaoRequiredFields: RequiredFields = {
  toCreate: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ],
  toEdit: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ],
  toFinalize: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ]
}
