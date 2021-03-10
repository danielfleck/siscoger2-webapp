import { RequiredFields, Rules } from './'

export const padRules: Rules = {
  toShow: {
    permissions: [/* 'listar-pad', 'ver-pad' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-pad' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-pad' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-pad' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-pad' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-pad' */],
    roles: []
  }
}

export const padRequiredFields: RequiredFields = {
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
