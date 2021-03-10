import { RequiredFields, Rules } from './'

export const fatdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-fatd', 'ver-fatd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-fatd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-fatd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-fatd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-fatd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-fatd' */],
    roles: []
  }
}

export const fatdRequiredFields: RequiredFields = {
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
