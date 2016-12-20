module.exports = {
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  },
  template: '<button class="uk-width-1-1 uk-button" v-on:click.prevent="openOverlay">Edit Table</button>  <div class="overlay" :class="{\'overlay--open\': open}">    <div class="overlay__inner">      <div class="uk-clearfix">        <div class="uk-float-right">          <a v-on:click="close" class="uk-button"><i class="uk-icon-close"></i> Ready</a>        </div>        <h1 class="overlay__headline">Table</h1>      </div>      <div class="overlay__list" style="padding: 50px">        <div class="uk-position-relative">          <table class="uk-table uk-table-hover plugin__tabledata">            <thead>              <tr>                <template track-by="$index" v-for="th in model.thead">                  <th>                    <a style="position: absolute; top: -20px;" v-on:click="removeCol($index)"><i class="uk-icon-close"></i></a>                    <input v-model="th" type="text" class="uk-width-1-1">                  </th>                </template>              </tr>            </thead>            <tbody>              <template track-by="$index" v-for="(trkey, tr) in model.tbody">                <tr>                  <template track-by="$index" v-for="td in tr">                    <td>                      <a style="position: absolute; left: -20px;" v-if="!$index" v-on:click="removeRow(trkey)"><i class="uk-icon-close"></i></a>                      <input v-model="td" type="text" class="uk-width-1-1">                    </td>                  </template>                </tr>              </template>            </tbody>          </table>          <button v-on:click.prevent="addRow" class="uk-button">Add Row</button>          <button style="position: absolute;right: -80px;top: 35px;transform: rotate(90deg);width: 100px;" v-on:click.prevent="addCol" class="uk-button">Add Col</button>        </div>        <div style="margin-top:50px">JSON-Output: {{model|json}}</div>      </div>    </div>  </div>',
  data: function data() {
    return {
      open: false,
      tableData: {
        plugin: 'tableblok',
        thead: ['Head 1', 'Head 2'],
        tbody: [
          ['one', 'two']
        ]
      }
    };
  },
  props: ['model'],
  computed: {
    cols: function cols() {
      if (this.model && this.model.plugin == 'tableblok') {
        return this.model.thead.length;
      }
      return 0;
    }
  },
  created: function created() {
    if (!this.model || this.model.plugin != 'tableblok') {
      this.model = this.tableData;
    }
  },
  methods: {
    close: function close() {
      this.open = false;
    },
    openOverlay: function openOverlay() {
      this.open = true;
    },
    addRow: function addRow() {
      var row = [];
      for (var i = 0; i < this.cols; i++) {
        row[i] = '';
      }
      this.model.tbody.push(row);
    },
    addCol: function addCol() {
      this.model.thead.push('');
      this.model.tbody.forEach(function(item) {
        item.push('');
      });
    },
    removeCol: function removeCol(index) {
      this.model.thead.splice(index, 1);
      this.model.tbody.forEach(function(item) {
        item.splice(index, 1);
      });
    },
    removeRow: function removeRow(index) {
      this.model.tbody.splice(index, 1);
    }
  }
};
