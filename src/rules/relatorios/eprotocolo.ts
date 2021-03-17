import { RequiredFields, Rules } from '..'

export const eprotocoloRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-eprotocolo', 'ver-eprotocolo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-eprotocolo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-eprotocolo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-eprotocolo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-eprotocolo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-eprotocolo' */
    ],
    roles: []
  }
}

export const eprotocoloRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
