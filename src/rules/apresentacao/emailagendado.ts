import { RequiredFields, Rules } from '..'

export const emailagendadoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-emailagendado', 'ver-emailagendado' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-emailagendado' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-emailagendado' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-emailagendado' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-emailagendado' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-emailagendado' */
    ],
    roles: []
  }
}

export const emailagendadoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
