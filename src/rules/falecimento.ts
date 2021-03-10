import { RequiredFields, Rules } from './'

export const falecimentoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-falecimento', 'ver-falecimento' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-falecimento' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-falecimento' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-falecimento' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-falecimento' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-falecimento' */],
    roles: []
  }
}

export const falecimentoRequiredFields: RequiredFields = {
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
