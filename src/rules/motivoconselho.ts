import { RequiredFields, Rules } from './'

export const motivoconselhoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-motivoconselho', 'ver-motivoconselho' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-motivoconselho' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-motivoconselho' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-motivoconselho' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-motivoconselho' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-motivoconselho' */],
    roles: []
  }
}

export const motivoconselhoRequiredFields: RequiredFields = {
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
