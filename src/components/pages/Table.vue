<template>
  <q-table
    :grid="$q.screen.xs"
    :columns="columns"
    :data="getFilteredValuesData"
    row-key="name"
    no-data-label="Sem resultados"
    no-results-label="Sem resultados"
    :dense="dense"
    :flat="flat"
    :bordered="bordered"
    :square="square"
    :filter="filter"
    :title="label"
  >
    <template v-slot:header="props">
      <!-- <q-tr>
        <q-th class="full-width">
        {{label}}
        </q-th>
      </q-tr> -->
      <q-th
        :props="props"
        @hover.native.stop
        v-for="col in props.cols"
        :key="col.name"
        auto-width
      >
        <div class="row inline">
          <div class="column">
            <p>{{ col.label }}</p>
          </div>
        </div>
      </q-th>
      <!-- /table names -->
      <!-- table filters -->
      <q-tr :props="props" class="ignore-elements" v-if="columns_filter && data.length">
        <q-th :key="col.name" v-for="col in props.cols" style="padding: 2px;">
          <q-input
          outlined
          dense
          class="q-pl-xs q-pr-xs"
          v-model="filterData[col.field]"
          >
            <template v-if="filterData[col.field]" v-slot:append>
              <q-icon name="cancel" @click.stop="filterData[col.field] = ''" class="cursor-pointer"/>
            </template>
          </q-input>
        </q-th>
      </q-tr>
      <!-- /table filters -->
    </template>

    <template v-slot:top-right="props" v-if="fullscreen || global_search">
      <q-input
        v-if="global_search"
        clearable
        outlined
        dense
        debounce="300"
        v-model="filter"
        class="q-mr-md"
        placeholder="Buscar"
        >
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>

      <q-btn v-if="fullscreen"
        flat
        round
        class="q-ml-sm"
        dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        >
        <q-tooltip
          :disable="$q.platform.is.mobile"
          v-close-popup
        >
        {{props.inFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}}
        </q-tooltip>
      </q-btn>
    </template>

    <template v-slot:top-left="props" v-if="excel || csv">
      <q-btn
        class="bg-grey-2 q-mr-sm" icon="fas fa-file-csv"
        no-caps v-if="csv"
        @click="exportTable('csv')"
      >
      <q-tooltip
          :disable="$q.platform.is.mobile"
          v-close-popup
        >
        Exportar em formato CSV
        </q-tooltip>
      </q-btn>

      <q-btn
        class="bg-grey-2 q-mr-sm" icon="fas fa-file-excel"
        no-caps v-if="excel"
        @click="exportTable('xlsx')"
      >
      <q-tooltip
          :disable="$q.platform.is.mobile"
          v-close-popup
        >
        Exportar em formato Excel
        </q-tooltip>
      </q-btn>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <template v-if="col.name !== 'actions'">
            <text-highlight :queries="filter">{{ props.row[col.field] }}</text-highlight>
          </template>
          <template v-else>
            <q-btn dense round flat color="grey" icon="edit" @click="$emit('edit',props.row)"></q-btn>
            <q-btn dense round flat color="grey" icon="delete" @click="$emit('delete',props.row)"></q-btn>
          </template>
        </q-td>
      </q-tr>
    </template>

  </q-table>
</template>

<script>
import { exportFile } from 'quasar'
import TextHighlight from 'vue-text-highlight'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)
  formatted = formatted.split('"').join('""')
  /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `"${formatted}"`
}

export default {
  name: 'Table',
  components: { TextHighlight },
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    data: {
      type: [Array, Object],
      default: () => ([])
    },
    columns: {
      type: [Array, Object],
      default: () => ([])
    },
    csv: {
      type: Boolean,
      default: true
    },
    excel: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    global_search: {
      type: Boolean,
      default: true
    },
    header_filter: {
      type: Boolean,
      default: true
    },
    columns_filter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      filterData: {},
      columnOptions: {},
      columnOptionsSelected: {},
      filterFlags: {},
      selectionProp: '',
      name: '',
      selectedProp: [],
      filter: ''
    }
  },
  computed: {
    getFilteredData () {
      const hasData = (item, column, self) => {
        const content = self.filterData[column]?.toLowerCase()
        return item[column]?.toString()?.toLowerCase()?.indexOf(content) === -1
      }

      const self = this
      const tableColumns = this.columns.map((column) => column.field)
      const tableData = this.data.filter((item) => {
        for (let i = 0; i < tableColumns.length; i++) {
          const column = tableColumns[i]
          if (self.filterData[column] === '') { continue }
          if (column in self.filterData && hasData(item, column, self)) {
            return false
          }
        }
        return true
      })
      return tableData
    },
    getFilteredValuesData () {
      const self = this
      const hasData = (item, selectedItem, self) => {
        const content = item[selectedItem]?.toString()?.toLowerCase()
        return self.columnOptionsSelected[selectedItem]?.indexOf(content) == -1
      }
      this.columnOptionsSelected = Object.assign({}, this.columnOptionsSelected)
      const tableData = this.getFilteredData.filter((item) => {
        for (let i = 0; i < self.columns.length; i++) {
          const selectedItem = self.columns[i].field
          if (self.columnOptionsSelected[selectedItem].length == 0) { continue }
          if (hasData(item, selectedItem, self)) {
            return false
          }
        }
        return true
      })
      return tableData
    }
  },
  watch: {
    selectedProp: function () {
      this.$emit('selected-val', this.selectedProp)
    }
  },
  created () {
    if (this.selection === undefined) {
      this.selectionProp = 'none'
    } else {
      this.selectionProp = this.selection
    }
    if (this.label === undefined) {
      this.name = 'Download'
    } else {
      this.name = this.label
    }
    if (this.selected === undefined) {
      this.selectedProp = []
    } else {
      this.selectedProp = this.selected
    }
    const self = this
    self.columnOptions = {}
    self.columns.filter(function (item) {
      self.columnOptions[item.field] = []
      self.$set(self.columnOptionsSelected, item.field, [])
      self.filterFlags[item.field] = false
      return item
    })
    self.data.filter(function (item) {
      self.columns.filter(function (column) {
        self.columnOptions[column.field].push({
          label: item[column.field].toString(),
          value: item[column.field].toString().toLowerCase().replace(/_/g, '_')
        })
      })
    })
    self.columns.filter(function (column) {
      self.columnOptions[column.field] = [...new Map(self.columnOptions[column.field].map(item =>
        [item.value, item])).values()]
    })
  },
  methods: {
    exportTable (type = '') {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.data.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')
      const status = exportFile(
        `${this.label}.${type}`,
        content,
        `text/${type}`
      )
      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
