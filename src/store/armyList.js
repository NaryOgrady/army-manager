import { defineStore } from 'pinia';
import _Inflector from 'inflector-js';

const useArmyListStore = defineStore('armyList', {
  state: () => {
    return {
      armyList: [],
    };
  },

  actions: {
    parseRoster( rosterDom) {
      const categories = [...rosterDom.querySelectorAll('.force .category')].filter(cat => {
        const categoryName = cat.children[0].innerText;
        return categoryName !== 'Game Options' &&
          categoryName !== 'Core Battalion';
      });
      const newArmy = [...categories].reduce((na, cat) => {
        const categoryName = cat.children[0].innerText;
        if (categoryName === 'Allegiance') {
          const info = cat.getElementsByClassName('rootselection');
          if (!info || !info.length) {
            throw new Error('Missing Allegiance - invalid roster.');
          }
          na.allegiance = this.processAllegiance(info[0]);
          return na;
        }
        na.categories.push(categoryName);
        const units = cat.querySelectorAll('.rootselection');
        if (units) {
          na.units.push(...this.processUnits(units, categoryName));
        }
        return na;
      }, {units: [], categories: []});
      const armyName = rosterDom.querySelector('h1').innerText || '';
      newArmy.name = armyName;
      this.armyList.push(newArmy);
    },

    processAllegiance(info) {
      const tables = [...info.querySelectorAll('table')];
      const battleTraitIndex = tables.findIndex(t => (
        t.rows[0].children[0].innerText === 'Battle Trait'
      ));
      const battleTraitTable = tables.splice(battleTraitIndex, 1)[0];
      const newInfo = this.getUnitStats([battleTraitTable]);
      if (tables.length) {
        newInfo.otherInfo = tables;
      }
      return newInfo;
    },

    processUnits(units, category='') {
      return [...units].map(unit => {
        const newUnit = new Object();
        newUnit.name = unit.children[0].innerText;
        const infoTables = unit.querySelectorAll('table');
        if (!infoTables) {
          throw new Error(`invalid unit ${newUnit.name}`);
        }
        return { ...newUnit, ...this.getUnitStats(infoTables), category };
      });
    },

    getUnitStats(infoTables) {
      return [...infoTables].reduce((stats, table) => {
        const header = table.rows[0].children[0].innerText;
        stats[_Inflector.underscore(header).replace(/\s/, '')] = this.processStats(table);
        return stats;
      },
      new Object());
    },

    processStats(table) {
      const headers = [...table.rows[0].children].map(td => td.innerText);
      if (table.rows.length === 2) {
        return [...table.rows[1].children].reduce((newStats, cell, index) => {
          if (index === 0) {
            newStats.name = cell.innerText;
          } else {
            newStats[_Inflector.underscore(headers[index].replace(/\s/, ''))] = cell.innerText;
          }
          return newStats;
        }, new Object());
      }
      return [...table.rows].slice(1).map(row => {
        return [...row.children].reduce((newStats, cell, index) => {
          if (index === 0) {
            newStats.name = cell.innerText;
          } else {
            newStats[_Inflector.underscore(headers[index].replace(/\s/, ''))] = cell.innerText;
          }
          return newStats;
        }, new Object());
      });
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'army-list',
        storage: localStorage,
        paths: [
          'armyList',
        ],
      },
    ],
  },
});

export default useArmyListStore;
