import { RequiredFields, Rules } from './'

export const comportamentoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-comportamento', 'ver-comportamento' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-comportamento' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-comportamento' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-comportamento' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-comportamento' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-comportamento' */],
    roles: []
  }
}

export const comportamentoRequiredFields: RequiredFields = {
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
