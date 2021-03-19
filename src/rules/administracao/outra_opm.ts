import { RequiredFields, Rules } from '..'

export const listaroutaopmRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-listaroutaOpm', 'ver-listaroutaOpm' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-listaroutaOpm' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-listaroutaOpm' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-listaroutaOpm' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-listaroutaOpm' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-listaroutaOpm' */
    ],
    roles: []
  }
}

export const listaroutaOpmRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
