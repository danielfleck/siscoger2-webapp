import { RequiredFields, Rules } from '..'

export const buscaofendidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscaofendido', 'ver-buscaofendido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscaofendido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscaofendido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscaofendido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscaofendido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscaofendido' */
    ],
    roles: []
  }
}

export const buscaofendidoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
