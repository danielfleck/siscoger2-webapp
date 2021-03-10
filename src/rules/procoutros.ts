import { RequiredFields, Rules } from './'

export const procoutroRules: Rules = {
  toShow: {
    permissions: [/* 'listar-procoutro', 'ver-procoutro' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-procoutro' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-procoutro' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-procoutro' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-procoutro' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-procoutro' */],
    roles: []
  }
}

export const procoutroRequiredFields: RequiredFields = {
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
