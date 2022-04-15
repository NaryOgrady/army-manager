<template>
  <v-app>
    <roster-uploader v-if="!roster" @upload="handleRosterUpload"/>
    <view-roster :roster="roster" v-else></view-roster>
  </v-app>
</template>

<script>
import RosterUploader from './components/RosterUploader.vue'
import ViewRoster from './components/ViewRoster.vue'

export default {
  name: 'App',

  components: {
    RosterUploader,
    ViewRoster,
  },

  data() {
    return {
      roster: null,
      allegiance: null,
    };
  },

  methods: {
    handleRosterUpload(rosterDom) {
      const categories = rosterDom.querySelectorAll('.force .category');
      this.roster = [...categories].map(cat => {
        const newCat = new Object();
        newCat.name = cat.children[0].innerText;
        const units = cat.querySelectorAll('.rootselection');
        if (units) {
          newCat.units = this.processUnits(units);
        }
        return newCat;
      })

    },

    processUnits(units) {
      return [...units].map(unit => {
        const newUnit = new Object();
        newUnit.name = unit.children[0].innerText;
        const infoTables = unit.querySelectorAll('table');
        if (!infoTables) {
          throw new Error(`invalid unit ${newUnit.name}`);
        }
        return { ...newUnit, ...this.getUnitStats(infoTables) };
      });
    },

    getUnitStats(infoTables) {
      return [...infoTables].reduce((stats, table) => {
        const header = table.rows[0].children[0].innerText;
        stats[this.camelize(header)] = this.processStats(table);
        return stats;
      },
      new Object());
    },

    processStats(table) {
      const headers = [...table.rows[0].children].slice(0, -1).map(td => td.innerText);
      if (table.rows.length === 2) {
        return [...table.rows[1].children].slice(0, -1).reduce((newStats, cell, index) => {
          if (index === 0) {
            newStats.name = cell.innerText;
          } else {
            newStats[this.camelize(headers[index])] = cell.innerText;
          }
          return newStats;
        }, new Object());
      }
      return [...table.rows].slice(1).map(row => {
        return [...row.children].slice(0, -1).reduce((newStats, cell, index) => {
          if (index === 0) {
            newStats.name = cell.innerText;
          } else {
            newStats[this.camelize(headers[index])] = cell.innerText;
          }
          return newStats;
        }, new Object());
      });
    },

    camelize(str) {
      // eslint-disable-next-line no-debugger
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }
  },

}
</script>
