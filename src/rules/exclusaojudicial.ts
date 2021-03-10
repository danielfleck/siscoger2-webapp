import { RequiredFields, Rules } from './'

export const exclusaojudicialRules: Rules = {
  toShow: {
    permissions: [/* 'listar-exclusaojudicial', 'ver-exclusaojudicial' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-exclusaojudicial' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-exclusaojudicial' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-exclusaojudicial' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-exclusaojudicial' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-exclusaojudicial' */],
    roles: []
  }
}

export const exclusaojudicialRequiredFields: RequiredFields = {
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
