import { RequiredFields, Rules } from './'

export const andamentoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-andamento', 'ver-andamento' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-andamento' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-andamento' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-andamento' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-andamento' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-andamento' */],
    roles: []
  }
}

export const andamentoRequiredFields: RequiredFields = {
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
