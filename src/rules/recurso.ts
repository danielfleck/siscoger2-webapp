import { RequiredFields, Rules } from './'

export const recursoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-recurso', 'ver-recurso' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-recurso' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-recurso' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-recurso' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-recurso' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-recurso' */],
    roles: []
  }
}

export const recursoRequiredFields: RequiredFields = {
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
