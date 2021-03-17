import { RequiredFields, Rules } from '..'

export const mailRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-mail', 'ver-mail' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-mail' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-mail' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-mail' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-mail' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-mail' */
    ],
    roles: []
  }
}

export const mailRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
